<input type="file" class="file" name="uploadfile" onchange="myfun(this.files[0])">
<script src="../jquery-1.8.3.js"></script>
<script>
function myfun(obj) {
    console.log(obj);
    $.ajax({
        headers: {
            'X-Requested-With':'XMLHttpRequest',
            'Accept':'application/json, text/javascript, */*; q=0.01',
            'Content-Type':'application/x-www-form-urlencoded',
            'X-File-Name':obj.name,
            'Content-Length': 111
        },
        url : 'extras/file_upload.php',
        type: "POST",
        dataType: 'json',
        success: function (data, status, xhr) {
            console.log(data);
            //console.log(xhr);            
        },
        complete: function(xhr, status){
            console.log(xhr);
            console.log(status)
        }
    })
}
</script>