$(document).ready(function () {
	$("#call").click(function () {
		$.ajax({
			url: "http://localhost:1337",
			accepts: "application/json",
			type: "PUT",
			contentType: "application/json",
			success: function (res) {
				alert(res.data);
			},
			error: function () {
				alert("Erreur =S");
			}
		});
	});
});
