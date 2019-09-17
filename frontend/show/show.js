(async () => {
    $('#go-back').click((e) => {
        e.preventDefault();
        window.history.back();
    });

    const buttonLoader = new ButtonLoader(
        $('.loader'),
    );
    $('.card').hide();
    buttonLoader.show();

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const phrase = await fetch(`https://amazingphrases.herokuapp.com/phrase/${id}`)
        .then(res => res.json());

    $('.card').show();
    buttonLoader.hide();

    phrase.date = (new Date(phrase.date)).toLocaleDateString();
    Object.keys(phrase).forEach(key => {
        $('#' + key).html(phrase[key]);
    });
    $('.like').html(mountLikeButtom(phrase.vote, phrase.id))
})(window.jQuery);
