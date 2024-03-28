$(document).ready(() => {
    target = document.getElementById("upcoming_content");
    $.getJSON("/fetch_material", (data) => {
        for (i in data) {
            $("#upcoming_content").append(`<button class="collapse" type="button">${i}    ${data[i]["Room"]}    ${data[i]["Start time"]}-${data[i]["End time"]}    By: ${data[i]["teacher"]}</button>`)
            let display_text = "";
            if (data[i]["teacher_message"].length) {
                display_text += "<b>Message:</b>"
                for (let j = 0; j < data[i]["teacher_message"].length; j++) {
                    display_text += "<br>" + data[i]["teacher_message"][j];
                }
                display_text += "<br>"
            }
            display_text += "<b>Room:</b> " + data[i]["Room"] + "<br>" + "<b>Time:</b> " + data[i]["Start time"] + "-" + data[i]["End time"] + "<br>";
            if (data[i]["zoom_link"] != "") {
                display_text += "<b>Zoom Link: </b>" + `<a href='${data[i]["zoom_link"]}'>${data[i]["zoom_link"]}</a>` + "<br>";
            }
            display_text += "<b>Material:</b> ";
            $("#upcoming_content").append(`<p id='content_${i}' class='collapse_content'>${display_text}</p>`);
            if (data[i]["Material"].length == 0) {
                $(".collapse_content").last().append("No material available");
            }
            else {
                for (let j = 0; j < data[i]["Material"].length; j++) {
                    if (j == 0) {
                        $(".collapse_content").last().append(`<br> ${data[i]["Material"][j]["type"]} <menu>`);
                    }
                    else {
                        if (data[i]["Material"][j]["type"] != data[i]["Material"][j - 1]["type"]) {
                            $(".collapse_content").last().append("</menu>" + data[i]["Material"][j]["type"] + "<menu>");
                        }
                    }
                    $(".collapse_content").last().append(`<li> <a href='${data[i]["Material"][j]["link"]}'>${data[i]["Material"][j]["name"]}</a></li>`);
                }
                $(".collapse_content").last().append("</menu>");
                $(".collapse_content").last().append(`<button class="email_button" id="email_button_${i}" type="button">Send to your email</button>`);
                document.getElementById(`email_button_${i}`).addEventListener("click", (event) => {
                    let parent_element_text = event.target.parentElement.innerHTML;
                    parent_element_text = parent_element_text.substring(0, parent_element_text.indexOf("<button"));
                    $.get(`/send_email?html_text=${parent_element_text}`, (data, status) => {alert("Email sent!")})
                });
            }
        }
        $(".collapse").click(function () {
            $(this).next().slideToggle("slow");
        });
    });
});
