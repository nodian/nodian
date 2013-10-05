$(document).ready(function()
{
    $('#speech').bind('webkitspeechchange',function()
    {
        $(this).parent('form').submit();
    });
});