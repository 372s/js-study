<?php

class ClassUpload {

    const DEF_IMG = 1;

    const DEF_LOGO_GROUP = 2;

    const DEF_LOGO_USER = 3;

    const DEF_LOGO_JOUR = 4;

    const DEF_LOGO_SPECIAL = 1;

    const DEF_LOGO_SPECIAL_ARTICLE = 1;

    const DEF_VIDEO_THUMB = 1;

    protected $_iError;

    protected $_aFile;

    protected $_bWaterMark = TRUE;

    private $_bRealUpload = TRUE;

    private static $_sPrivatePath = '/upload_private/';

    private static $_sPublicPath = '/upload/';

    private static $_sDownloadPath = '/upload/temp/';

    private static $_sThumbPath = '/upload/thumb/';

    /**
     * 初始化需要提供文件 post 时的名称
     * 如 post 表单里为 <input type='file' name='a'，则 new Upload('a')
     * 如 post 表单里为 <input type='file' name='b[3]'，则 new Upload('b', 3)
     */
    public function __construct($sName, $iOrder = NULL, $bWaterMark = TRUE) {
        if (!isset($_FILES[$sName])) {
            $this->_iError = 1;
            return FALSE;
        }
        $aFile = $_FILES[$sName];

        if(!$bWaterMark){
            $this->_bWaterMark = false;
        }

        if (isset($iOrder)) {
            if (!isset($aFile['error'][$iOrder])) {
                $this->_iError = 2;
                return FALSE;
            }
            $aFile = array_map(function ($aRow) use($iOrder) {
                    return $aRow[$iOrder];
            }, $aFile);
        }

        if (!isset($aFile['error'])) {
            $this->_iError = 3;
            return FALSE;
        }

        $this->_aFile = $aFile;
    }

    public function isSuccess() {
        return ($this->_iError === NULL) && ($this->_aFile['error'] === UPLOAD_ERR_OK);
    }

    public static function checkImage($fName, $iWidth = 0, $iHeight = 0, &$imgInfo = array(), $bAvatar=false) {
        $imgInfo = getimagesize($fName);
        if (!is_array($imgInfo)) {
            return FALSE;
        }
        if ($imgInfo[0] < $iWidth || $imgInfo[1] < $iHeight) {
            return FALSE;
        }
        return self::validateImageMime($imgInfo['mime'], $bAvatar);
    }

    public function isValidatedImage($iWidth = 20, $iHeight = 20, &$imgInfo = array()) {
        if (!$this->isSuccess()) {
            return FALSE;
        }
        return self::checkImage($this->_aFile['tmp_name'], $iWidth, $iHeight, $imgInfo);
    }

    public function isAvatarImage($iWidth = 20, $iHeight = 20, &$imgInfo = array()) {
        if (!$this->isSuccess()) {
            return FALSE;
        }
        return self::checkImage($this->_aFile['tmp_name'], $iWidth, $iHeight, $imgInfo, true);
    }

    public function setFakeUpload() {
        $this->_bRealUpload = FALSE;
    }

    private static function validateImageMime($mime, $bAvatar) {
        switch (strtolower($mime)) {
            case 'image/png':
            case 'image/jpeg':
            case 'image/x-ms-bmp':
            case 'image/bmp':
                return TRUE;
            case 'image/gif':
                return !$bAvatar;
            default:
                return FALSE;
        }
    }

    public function get($needMd5 = false, $owner=null) {
        if (!$this->isSuccess()) {
            return FALSE;
        }
        if (empty($owner)){
            $owner = BaseController::userId();
        }
        $tmpName = $this->_aFile['tmp_name'];
        $sMD5 = md5_file($tmpName);
        $imgInfo = array();
        $isImg = self::checkImage($this->_aFile['tmp_name'], 0, 0, $imgInfo);
        $iFile = GuideUploadFile::insertUploadFile($sMD5, $this->_aFile['size'], $isImg, $owner);
        // 如果成功插库，说明没重复，将文件放到 upload
        if (!empty($iFile)) {
            if ($this->_bRealUpload) {
                self::save($tmpName, $iFile, $isImg, $imgInfo, $this->_bWaterMark);
            } else {
                self::move($tmpName, $iFile, $isImg, $imgInfo, $this->_bWaterMark);
            }
        } else {
            $iFile = GuideUploadFile::getIdByHash($sMD5);
        }

        if (empty($iFile)) {
            return FALSE;
        }
        if (!$needMd5) {
            return $iFile;
        }
        return array($iFile, $sMD5);
    }

    protected static function validateDir($sFile) {
        $sDir = dirname($sFile);
        if (!file_exists($sDir)) {
            umask(0000);
            mkdir($sDir, 0777, true);
        }
    }

    private static function save($tmpName, $iFile, $isImg, $imgInfo, $bWater=true) {
        $sBaseFile = self::makeName($iFile);
        $src = self::$_sPrivatePath . $sBaseFile;
        $target = self::$_sPublicPath . $sBaseFile;

        self::validateDir($src);
        self::validateDir($target);
        if (!move_uploaded_file($tmpName, $src)) {
            return;
        }

        if ($isImg) {
            if ($bWater) {
                if (!self::makeWaterMark($src, $target, $imgInfo)) {
                    copy($src, $target);
                }
            } else {
                copy($src, $target);
            }
        }
    }


    private static function move($tmpName, $iFile, $isImg, $imgInfo, $bWater=true) {
        $sBaseFile = self::makeName($iFile);
        $src = self::$_sPrivatePath . $sBaseFile;
        $target = self::$_sPublicPath . $sBaseFile;

        self::validateDir($src);
        self::validateDir($target);
        if (!rename($tmpName, $src)) {
            return;
        }
        if ($isImg) {
            if ($bWater) {
                if (!self::makeWaterMark($src, $target, $imgInfo)) {
                    copy($src, $target);
                }
            } else {
                copy($src, $target);
            }
        }
    }

    public static function makeWaterMark($src, $target, $imgInfo) {
        //2016-09-01 无条件去掉水印（编辑想要水印的话，线下用工具来实现）
        return false;

        if ($imgInfo[0] < 400 || $imgInfo[1] < 350) {
            return false;
        }
        $wr = SHARE_RES;
        if ($imgInfo[0] > 3000) {
            $wr .= 'wr4.png';
        } else if ($imgInfo[0] > 1500) {
            $wr .= 'wr3.png';
        } else if ($imgInfo[0] > 1024) {
            $wr .= 'wr2.png';
        } else {
            $wr .= 'wr1.png';
        }
        $sCmd = "/usr/bin/convert '" . $src . "[0]' '$wr' -gravity SouthEast -composite ";
        $mime = $imgInfo['mime'];
        if (stripos($mime, '/png') !== FALSE) {
            $sCmd .= "png32:'$target'";
//        } else if (stripos($mime, '/gif') !== FALSE) {
//            $sCmd .= "gif:'$target'";
        } else {
            $sCmd .= "jpg:'$target'";
        }
        $output = array();
        $exitCode = 0;
        exec($sCmd, $output, $exitCode);
        if ($exitCode !== 0) {
            MedliveLogs::doErrorLog('cmd:' . $sCmd);
            MedliveLogs::doErrorLog('code:' . $exitCode, FAlSE);
            MedliveLogs::doErrorLog('out:' . implode(',', $output), FAlSE);
            return false;
        }
        return true;
    }

    public static function makeName($iFile) {
        $iFile = intval($iFile);
        if ($iFile === 0) {
            $iFile = 1;
        }
        $sFileName = sprintf('%09d', $iFile);
        $aFileName = str_split($sFileName, 3);
        return implode('/', $aFileName);
    }

    public static function getURL($iFile) {
        return self::$_sUploadURL . self::makeName($iFile);
    }

    public static function getPath($iFile) {
        return self::$_sPublicPath . self::makeName($iFile);
    }

    /**
     * 资源名哈希
     * @param $md5 资源MD5
     * @param $sFileName 文件名
     * @return string
     */
    public static function hashDownloadRes($md5, $sFileName, $key = '') {
        return hash('crc32', ccstr('_', $md5, $sFileName, $key) . 'lkdfgj8r_skey');
    }

    /**
     * 下载文件是否存在
     * @param $sFileMd5 文件Md5
     * @param $sFileName 文件名称
     */
    public static function isDownloadFileExists($sFileMd5, $sFileName){
        $sId = self::makeDownloadUID();
        $destPath = self::$_sDownloadPath . $sId . $sFileMd5 . '/';
        $destFile = $destPath . $sFileName;
        return file_exists($destFile);
    }

    /**
     * 取得下载文件链接
     * @param $sFileMd5 文件Md5
     * @param $sFileName 文件名称
     * @param $needDownloadCntInc 是否更新文件下载数
     * @param $iFile 文件ID
     * @return string|false
     */
    public static function getDownloadURI($sFileMd5, $sFileName, $needDownloadCntInc = true, $iFile = NULL, $need_user = true) {
//        if ($needDownloadCntInc) {
//            @DownloadFacade::incFileDownloadCount($sFileMd5);
//        }
        if($need_user){
            $sId = self::makeDownloadUID();
        }else{
            $sId = '';
        }
        $sFileName = str_replace(" ", "+", $sFileName);
        $downloadFile = self::$_sDownloadURL . $sId . $sFileMd5 . '/' . urlencode($sFileName);
        $destPath = self::$_sDownloadPath . $sId . $sFileMd5 . '/';
        $destFile = $destPath . $sFileName;
        if (file_exists($destFile)) {
            return $downloadFile;
        }
        @mkdir($destPath, 0777, true);
        if (empty($iFile)) {
            $iFile = GuideUploadFile::getIdByHash($sFileMd5);
            if (!$iFile) {
                return false;
            }
        }
        $fName = self::makeName($iFile);
        $srcFile = self::$_sPrivatePath . $fName;
        $isImg = self::checkImage($srcFile, 0, 0);
        if ($isImg) {
            $srcFile = self::$_sPublicPath . $fName;
        }
        if (@symlink($srcFile, $destFile)) {
            return $downloadFile;
        } else {
            return false;
        }
    }

    private static function makeDownloadUID() {
        $sId = @BaseController::userId();
        if (empty($sId)) {
            return '';
        }
        $result = sprintf('%02s', dechex($sId % 255)) . '/' . $sId . '/';
        return $result;
    }

    public static function getThumbByHash($sHash = 0, $sType = 'small', $defFile = self::DEF_IMG) {
        if (empty($sHash)) {
            $iFile = $defFile;
        }else{
            $iFile = GuideUploadFile::getIdByHash($sHash);
        }
        return self::getThumb($iFile, $sType, $defFile);
    }

    public static function getURLByHash($sHash) {
        if (empty($sHash)) {
            $iFile = 0;
        }else{
            $iFile = GuideUploadFile::getIdByHash($sHash);
        }
        return self::getURL($iFile);
    }

    public static function getThumb($iFile = 0, $sType = 'small', $defFile = self::DEF_IMG) {
        if (!$iFile) {
            $iFile = $defFile;
        }
        return self::$_sThumbURL . self::makeName($iFile) . '_' . $sType;
    }

    public static function getOriginalUrl($iFile) {
        if (!$iFile) {
            return '';
        }
        return self::$_sPublicPath . self::makeName($iFile);
    }

    public static function getSpecialThumb($iFile = 0, $sType = 'specialthumb') {
        return self::getThumb($iFile, $sType, self::DEF_LOGO_SPECIAL);
    }

    public static function getSpecialImage($iFile = 0, $sType = 'specialimage') {
        return self::getThumb($iFile, $sType, self::DEF_LOGO_SPECIAL);
    }

    public static function getSpecialArticle($iFile = 0, $sType = 'specialarticle') {
        return self::getThumb($iFile, $sType, self::DEF_LOGO_SPECIAL_ARTICLE);
    }

    public static function getVideoThumb($iFile = 0, $sType = 'videothumb') {
        return self::getThumb($iFile, $sType, self::DEF_VIDEO_THUMB);
    }

    public static function getGroupThumb($iFile = 0, $sType = 'small') {
        return self::getThumb($iFile, $sType, self::DEF_LOGO_GROUP);
    }

    public static function getJourThumb($iFile = 0, $sType = 'jourcover') {
        return self::getThumb($iFile, $sType, self::DEF_LOGO_JOUR);
    }

    public static function getGroupLogoSimple($iFile = 0, $sType = 'small') {
        return self::getThumb($iFile, $sType, self::DEF_LOGO_GROUP);
    }

    public static function getUserThumb($iFile = 0, $sType = 'small') {
        if ($iFile >= 1 && $iFile <= 99) {
            $iFile = self::DEF_LOGO_USER;
        }
        return self::getThumb($iFile, $sType, self::DEF_LOGO_USER);
    }

    /**
     * 通过文件MD5取得文件ID
     * @param $sFileMd5
     * @return int
     */
    public static function getIdByHash($sFileMd5) {
        return GuideUploadFile::getIdByHash($sFileMd5);
    }

    /**
     * 根据附件信息取得文件下载数
     * @param $sFileMd5 文件MD5
     * @return number
     */
    public static function sumArticleInfoDownLoadCnt($aArticleInfo) {
        if (empty($aArticleInfo)) {
            return 0;
        }
        return DownloadFileCountPDO::sumArticleInfoDownLoadCnt($aArticleInfo);
    }
    /*
     * 图片裁剪
     */
    public static function cutPhoto($iFile, $aArg){
        $image = self::$_sPublicPath . self::makeName($iFile);
        $imageInfo = getimagesize($image);
        if($imageInfo!== false) {
            $imageType = strtolower(substr(image_type_to_extension($imageInfo[2]),1));
            $info = array(
                "width" => $imageInfo[0],
                "height" => $imageInfo[1],
                "type" => $imageType,
                "mime" => $imageInfo['mime'],
            );
        }else {
            return false;
        }
        $srcWidth = $info['width'];
        $srcHeight = $info['height'];
        $type = strtolower($info['type']);
        $interlace = 1;
        unset($info);

        $width  = $srcWidth;
        $height = $srcHeight;
        //载入原图
        $createFun = 'imagecreatefrom' . ($type=='jpg' ? 'jpeg' : $type);
        $srcImg = $createFun($image);

        //创建缩略图
        if($type!='gif' && function_exists('imagecreatetruecolor'))
            $thumbImg = imagecreatetruecolor($width, $height);
        else
            $thumbImg = imagecreate($width, $height);

        //复制图片
        if(function_exists("ImageCopyResampled"))
            imagecopyresampled($thumbImg, $srcImg, 0, 0, 0, 0, $width, $height, $srcWidth,$srcHeight);
        else
            imagecopyresized($thumbImg, $srcImg, 0, 0, 0, 0, $width, $height,  $srcWidth,$srcHeight);

        if('gif'==$type || 'png'==$type) {
            $background_color  =  imagecolorallocate($thumbImg, 0, 255, 0);  //  指派一个绿色
            imagecolortransparent($thumbImg,$background_color);  //  设置为透明色，若注释掉该行则输出绿色的图
        }
        //对jpeg图形设置隔行扫描
        if('jpg'==$type || 'jpeg'==$type) 	imageinterlace($thumbImg, $interlace);
        //生成图片
        $imageFun = 'image'.($type=='jpg'?'jpeg':$type);

        //裁剪
        $thumbname = '/tmp/'.time();//生成的临时文件
        if($imageFun == 'imagejpeg') imagejpeg($thumbImg, $thumbname, 100);
        else $imageFun($thumbImg, $thumbname);

        $cutImg = imagecreatetruecolor($aArg['w'], $aArg['h']);
        imagecopyresampled($cutImg, $thumbImg,0,0,$aArg['x'],$aArg['y'],$aArg['w'],$aArg['h'],$aArg['w'],$aArg['h']);

        if($imageFun == 'imagejpeg') imagejpeg($cutImg,$thumbname, 100);
        else $imageFun($cutImg, $thumbname);
        imagedestroy($cutImg);
        imagedestroy($thumbImg);
        imagedestroy($srcImg);
        $owner = BaseController::userId();
        $sMD5 = md5_file($thumbname);
        $imgInfo = array();
        $isImg = self::checkImage($thumbname, 0, 0, $imgInfo);
        $iFile = GuideUploadFile::insertUploadFile($sMD5, filesize($thumbname), $isImg, $owner);
        // 如果成功插库，说明没重复，将文件放到 upload
        if (!empty($iFile)) {
            self::move($thumbname, $iFile, $isImg, $imgInfo, false);
        } else {
            $iFile = GuideUploadFile::getIdByHash($sMD5);
        }

        if (empty($iFile)) {
            return FALSE;
        }
        return $iFile;
    }
}