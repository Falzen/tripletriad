
$(document).ready(function() {
	$('.menu-item').on('click', function(ev) {
		console.log(ev.target.dataset.sectionid);
		let wantedSectionId = ev.target.dataset.sectionid;
		$('.menu-content').hide();
		$('.menu-item').removeClass('is-selected');
		$(ev.target).addClass('is-selected');
		$('#'+wantedSectionId).show();
	});

});
