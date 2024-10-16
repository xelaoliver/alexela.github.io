var messages = [];

function random_id() {
	return Math.floor(Math.random()*(999-111))+111;
}

if (localStorage.getItem("rank") == null) {
	localStorage.setItem("rank", null);
}
if (localStorage.getItem("username") == null) {
	localStorage.setItem("username", "oatmeal"+random_id());
}

var cloud_main = random_id()+localStorage.getItem("username")+" has joined the chat.";
var old_cloud_main = null;
var old_cloud_request;
var cloud_request;
var cloud_respond;
var silent = false;

document.addEventListener("DOMContentLoaded", (event) => {
	document.getElementById('text').addEventListener('keydown', function(e) {
		if (e.key == "Enter") {
			send(document.getElementById("text").value);
		}
	})
})

function display_messages() {
	document.getElementById("message").innerHTML = messages.join("<br>");
}

function send(text) {
	document.getElementById("text").value = null;
	
	if (text.substring(0, 6) == "/user ") {
		let old_username = localStorage.getItem("username");
		localStorage.setItem("username", text.substring(6, text.length));
		if (!silent) {
			cloud_main = random_id()+old_username+" changed their name to "+localStorage.getItem("username");
		}
	} else if (text.substring(0, 5) == "/list") {
		cloud_request = random_id()+"list";
	} else if (text.substring(0, 8) == "/silent ") {
		cloud_main = random_id()+text.substring(8, text.length);
	} else if (text.substring(0, 7) == "/silent") {
		silent = !silent;
		if (silent) {
			messages.unshift("You are now in silent mode, redo this command to get out of it.");
		} else {
			messages.unshift("You are out of silent mode, you are chatting normaly.");
		}
		display_messages();
	} else if (text.substring(0, 6) == "/clear") {
		messages = [];
		display_messages();
	} else {
		if (silent) {
			cloud_main = random_id()+text;
		} else {
			cloud_main = random_id()+localStorage.getItem("username")+": "+text;
		}
	}
}

function update_message() {
	if (old_cloud_main != cloud_main) {
		messages.unshift(cloud_main.substring(3, cloud_main.length));
		display_messages();
	}
	old_cloud_main = cloud_main;
}

setInterval(function () {update_message()}, 15);
