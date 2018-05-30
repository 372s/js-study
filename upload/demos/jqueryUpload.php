<input type="file" class="file" name="myfile" onchange="myfun(this.files[0])">
<script src="../jquery-1.11.3.min.js"></script>
<script>
function myfun(obj) {
    var fd = new FormData();
    fd.append("myfile", obj);
    $.ajax({
        headers: {
            'X-File-Name':obj.name
        },
        url : '../upload.php',
        type: "POST",
        dataType: 'json',
        processData: false,
        contentType: false,
        data: fd,
        success: function (data, status, xhr) {
            console.log(data);
            //console.log(xhr);
            //$('#container').html(data);
            
        },
        complete: function(xhr, status){
            console.log(xhr);
            console.log(status)
        }
    })
}
</script>