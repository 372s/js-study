

# 会议记录
SELECT
  M.id, M.name,  M.start_time, M.end_time,
  (SELECT D.`name` FROM data_meeting_province D WHERE D.id = M.`province`) AS province_name,
  (SELECT C.`name` FROM data_meeting_city C WHERE C.id = M.`city`) AS city_name
FROM
  `meeting_base_info` AS M,
  `meeting_info_subject` AS S
WHERE M.`id` = S.`meeting_id`
  AND subject_id = 8;

# E脉播直播查询
SELECT
  *
FROM
  sch_class_info
WHERE (
    (state = "open"
      AND video_type = 1)
    OR (
      video_type = 2
      AND check_state = 3
      AND CONCAT(open_date, " ", start_time) <= "2018-5-28 11:17"
      AND CONCAT(open_date, " ", end_time) >= "2018-5-28 11:17"
    )
  )
  AND del_flg = "N"
  AND public_flg = "Y"
  AND branch_id = 8
  
# 查询一条点赞
SELECT * FROM zan_log WHERE bizid = 139599;

# 添加点赞
INSERT INTO zan_log VALUE (
  NULL,
  "research",
  "app",
  139599,
  1100411,
  "N",
  "192.168.188.193",
  "Mozilla/5.0 PHP",
  NOW()
);

# 查询精神科 点赞，点赞量排序
SELECT
  t.*,
  d.news_type,
  d.images,
  d.web_video_url,
  d.mobile_video_url,
  d.mobile_video_thumb,
  d.copyfrom,
  c.hits,
  c.app_hits,
  c.comments,
  c.shares
FROM
  kycms_c_news d,
  kycms_content t,
  kycms_content_count c
WHERE d.contentid = t.contentid
  AND t.contentid = c.contentid
  AND t.status = 99
  AND t.catid = 60
ORDER BY c.zan DESC
LIMIT 10,10

# 点赞排序
SELECT contentid,catid,(SELECT COUNT(*) FROM `medlivelog`.`zan_log` WHERE C.`contentid` = bizid AND del_flg = "N" AND `type` = "research") AS num
FROM `cms`.`kycms_content` AS C
WHERE C.`catid`=60 AND C.status = 99 
ORDER BY num DESC,contentid DESC