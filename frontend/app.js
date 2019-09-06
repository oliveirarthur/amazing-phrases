const vote = (id) => {
    const buttonLoader = new ButtonLoader($(`button#vote-${id}`));
    console.log('com o novo button loader', buttonLoader);

    buttonLoader.show();

    return fetch(`https://amazingphrases.herokuapp.com/phrase/vote/${id}`, {
        method: 'PUT',
    }).then(res => {
        return res.json();
    }).then(res => {
        const newButton = mountLikeButtom(res.vote, id);
        buttonLoader.hide(newButton);
    }).catch(err => {
        alert('Ocorreu um erro ao gravar seu voto =/ ' + JSON.stringify(err))
        buttonLoader.hide();
    });
};

const deletePhrase = (id) => {
    if (!confirm(`Tem certeza que deseja apagar a phrase #${id}?`)) {
        return Promise.resolve();
    }
    return fetch(`https://amazingphrases.herokuapp.com/phrase/${id}`, {
        method: 'DELETE',
    })
    .then(res => {
        alert('Phrase excluida com sucesso!');
        location.reload();
    }).catch(err => {
        alert('Ocorreu um erro ao apagar essa phrase =/ ', JSON.stringify(err, null, 4));
    });
}

const mountLikeButtom = (votes, id) => {
    return $('<button>', {
        class  : 'btn btn-outline-primary btn-sm float-right',
        html   : `<i class="fas fa-thumbs-up"></i> ${votes}`,
        id     : `vote-${id}`,
        onclick: `vote(${id})`,
    });
};

const mountDeleteButtom = (id) => {
    return $('<button>', {
        class  : 'btn btn-outline-danger btn-sm float-right mr-1',
        html   : `<i class="fas fa-trash"></i>`,
        id     : `delete-${id}`,
        onclick: `deletePhrase(${id})`,
        disabled: 'disabled',
        hidden: ''
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
                    $('<a> ', {
                        href: `./show/index.html?id=${phrase.id}`,
                        class: 'font-weight-bold mr-1',
                        html: '#' + phrase.id,
                    }),
                    $('<span>', { html: phrase.value }),
                    $('<div>').append(
                        $('<small>', { html: '-' + phrase.observation }),
                    ),
                ),
                $('<div>', {
                    class: 'card-footer',
                }).append(
                    $('<i>', { html: phrase.author }),
                    $('<span>', {
                        id: phrase.id,
                        html: ' @ ' + dateCreated.toLocaleString(),
                    }),
                    mountLikeButtom(phrase.vote, phrase.id),
                    mountDeleteButtom(phrase.id),
                ),
            ),
        );
    });

    $(document).on('click', '.card-footer span', function (e) {
        const target = $(e.target);
        target.data('clicked-times', (target.data('clicked-times') || 0) + 1);
        if (target.data('clicked-times') > 5) {
            const id = target.attr('id');
            $(`#delete-${id}`).removeAttr('disabled hidden');
        }
    });
})(window.jQuery);
