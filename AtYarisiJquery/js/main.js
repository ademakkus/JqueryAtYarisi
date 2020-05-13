$(document).ready(function() {
    const names = ["Şahbatur", "Gülbatur", "Canbatur", "Şahinbey", "Abay Kızı", "Abaküs"];
    //oluştur butonuna tıklanınca
    $("#btnCount").click(function() {
        $(".h4").removeClass("d-none");
        $(".h4").text = "";
        $(".h4").text = "Yarış birazdan başlayacak";

        const count = $("#count").val();
        //alert(count);
        if (isNaN(count) | !($.isNumeric(count))) {
            alert("Lütfen sadece sayısal değer giriniz.");
            $("#count").val("");
            return;
        }
        if (count > 6) {
            alert("Maksimum at sayısı 6 olmalıdır.");
            $("#count").val("");
            return;
        }
        let templates = [];
        for (let i = 1; i <= count; i++) {
            templates.push(`<div class="row"><div class="col"><img src="./img/h${i}.gif" alt=""></div></div> `);
        }
        document.getElementById("container").innerHTML = templates.join("<br>");
        $("#count").val("");
    });

    ///atların rastgele hızlarını oluşturan fonksiyon
    function random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    //Yarışı Başlat butonuna tıklanınca
    $("#btnStart").click(function() {

        var horses = document.getElementsByTagName("img");

        if (horses.length == 0 | !($.isNumeric(horses.length))) {
            alert("Lütfen adet giriniz ve Oluştur butonuna tıklayınız.");
            return;
        }
        var lblFinishPosition = $(".finish-label").position().left;

        var timer = setInterval(() => {
            // alert("fffff");
            $.each(horses, (key, value) => {
                let position = $(value).position().left;
                var itemWidth = $(value).position().left + $(value).width();

                let _counter = 0;
                let _winner = -1;
                for (let i = 0; i < horses.length; i++) {
                    if ($(horses[i]).position().left > _counter) {
                        _counter = $(horses[i]).position().left;
                        _winner = i;
                    }

                }
                $(".h4").text(`Yarışı  ${_winner+1} .kulvardaki ${names[_winner+1]} önde götürüyor.`);
                //Ctrl+; tuş kombinasyonuna basılarak  ` ` işaretleri arasına etiketler olduğu gibi yazılabilir
                //eğer " " veya ' ' kullanılırsa + işaretiyle birleştirilmesi gerekir.


                if (itemWidth > lblFinishPosition) {
                    clearInterval(timer);

                    //alert("Yarışı " + (key + 1) + " numaralı at kazandı.");
                    alert("Yarışı " + names[key] + " numaralı at kazandı.");

                    $("img").addClass("d-none");
                    $(".h4").addClass("d-none");

                    return;
                }

                //  var top = position.top;
                //  var left = position.left;

                $(value).css("left", (position + random(5, 30)));
            });
        }, 70);

    });
});