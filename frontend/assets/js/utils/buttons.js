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

const mountLikeButtom = (votes, id) => {
    return $('<button>', {
        class  : 'btn btn-outline-primary btn-sm float-right',
        html   : `<i class="fas fa-thumbs-up"></i> ${votes}`,
        id     : `vote-${id}`,
        onclick: `vote(${id})`,
    });
};
