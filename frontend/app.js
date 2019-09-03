const vote = (id) => {
    const buttonCurrent = $(`button#vote-${id}`);
    const buttonOld     = buttonCurrent.clone(); // caso a requisição falhe, restaura o botao
    const iconLoading   = $('<i>', { class: 'fas fa-spinner fa-pulse' });

    buttonCurrent.html(iconLoading); // show loading icon

    return fetch(`https://amazingphrases.herokuapp.com/phrase/vote/${id}`, {
        method: 'PUT',
    }).then(res => {
        return res.json();
    }).then(res => {
        const buttonNew = mountLikeButtom(res.vote, id);
        buttonCurrent.replaceWith(buttonNew);
    }).catch(err => {
        console.error(err);
        buttonCurrent.replaceWith(buttonOld);
    });
};

const mountLikeButtom = (votes, id) => {
    return $('<button>', {
        class  : 'btn btn-outline-primary btn-sm float-right',
        html   : `<i class="fas fa-thumbs-up"></i> ${votes}`,
        id     : `vote-${id}`,
        onclick: `vote(${id})`,
    });
};

(async ($) => {
    const phrasesDiv = $('.phrases');

    const phrases = await fetch('https://amazingphrases.herokuapp.com/phrase')
        .then(res => res.json())
        .then(res => res.sort((a, b) => b.vote - a.vote));

    phrasesDiv.html('');

    phrases.forEach(phrase => {
        const dateCreated = new Date(phrase.date);
        phrasesDiv.append(
            $('<div>', {
                class: 'card my-4',
            }).append(
                $('<div>', {
                    class: 'card-body',
                }).append(
                    $('<span>', { html: phrase.value }),
                    $('<div>').append(
                        $('<small>', { html: '-' + phrase.observation }),
                    ),
                ),
                $('<div>', {
                    class: 'card-footer',
                }).append(
                    $('<i>', { html: phrase.author }),
                    $('<span>', { html: ' @ ' + dateCreated.toLocaleString() }),
                    mountLikeButtom(phrase.vote, phrase.id),
                ),
            ),
        );
    });

})(window.jQuery);
