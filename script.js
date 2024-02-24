'use strict'

const url = 'data.json';
let n = 0;
let tbody = 0;
fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        n = json.date.length;
        tbody = document.querySelector('#schedule tbody');
        tbody.insertAdjacentHTML('beforeend', '<tr><th><br></th></tr>');
        for (let i = 0; i < n; i++) {
            tbody.insertAdjacentHTML('beforeend', '<tr><th>' + json.date[i] + '</th></tr>');
        }
    });

let undisturbed = 0;
let count = 0;
let target = 0;
let ths = 0;
let tds = 0;

const btn = document.querySelector('#btn');
const edit = document.querySelector('#edit');
const add = document.querySelector('#add');
const O = document.querySelector('#select p:nth-child(1)');
const X = document.querySelector('#select p:nth-child(2)');
const A = document.querySelector('#select p:nth-child(3)');

btn.onclick = () => {
    const name = window.prompt('名前を入力してください。');
    if (name != null) {
        undisturbed = 1;
        tbody.children[0].insertAdjacentHTML('beforeend', '<th>' + name + '</th>');
        for (let i = 0; i < n; i++) {
            tbody.children[i + 1].insertAdjacentHTML('beforeend', '<td></td>');
        }
        ths = document.querySelectorAll('#schedule th');
        tds = document.querySelectorAll('#schedule td');
        
        edit.style.display = 'none';
        add.style.display = 'block';

        const tr1 = document.querySelector('#schedule tr:first-child');
        count = tr1.children.length;
        
        (async () => {
            let promise1 = 0, promise2 = 0, promise3 = 0;
            for (let i = 0; i < n; i++) {
                target = tbody.children[i + 1].children[count - 1];
                target.style.backgroundColor = "#FFE4E1";
                promise1 = new Promise((resolve) => {
                    O.onclick = () => {
                        target.insertAdjacentHTML('beforeend', '<i class="fa-regular fa-circle"></i>');
                        resolve();
                    };
                });
                promise2 = new Promise((resolve) => {
                    X.onclick = () => {
                        target.insertAdjacentHTML('beforeend', '<i class="fa-solid fa-x"></i>');
                        resolve();
                    };
                });
                promise3 = new Promise((resolve) => {
                    A.onclick = () => {
                        target.insertAdjacentHTML('beforeend', '<i class="fa-solid fa-triangle-exclamation"></i>');
                        resolve();
                    };
                });
                await Promise.race([promise1, promise2, promise3]);
                target.style.backgroundColor = "#FFFACD";
            }
            edit.style.display = 'flex';
            add.style.display = 'none';
            setTimeout(() => {
                window.alert('入力が完了しました。');
                undisturbed = 0;
            }, 100);
        })();
    }

    for (let i = 1; i < count; i++) {
        ths[i].onclick = () => {
            if (undisturbed == 0) {
                const confirm = window.confirm('名前を変更しますか?');
                if(confirm) {
                    const newName = window.prompt('名前を入力してください。');
                    if (newName != null) {
                        ths[i].removeChild(ths[i].firstChild);
                        ths[i].insertAdjacentHTML('beforeend', newName);
                    }
                } else {
                    const confirm = window.confirm('またはこの列を削除しますか?');
                    const trs = document.querySelectorAll('#schedule tr');
                    if (confirm) {
                        for (let i = 0; i < n + 1; i++) {
                            trs[i].children[count - 1].remove();
                        }
                    }
                }
            }
        };
    }

    for (let i = 0; i < n*(count - 1); i++) {
        tds[i].onclick = () => {
            if (undisturbed == 0) {
                const confirm = window.confirm('入力内容を変更しますか?');
                if (confirm) {
                    (async () => {
                        let promise1 = 0, promise2 = 0, promise3 = 0;
                        tds[i].removeChild(tds[i].firstChild);
                        tds[i].style.backgroundColor = "#FFE4E1";
                        edit.style.display = 'none';
                        add.style.display = 'block';

                        promise1 = new Promise((resolve) => {
                            O.onclick = () => {
                                tds[i].insertAdjacentHTML('beforeend', '<i class="fa-regular fa-circle"></i>');
                                resolve();
                            };
                        });
                        promise2 = new Promise((resolve) => {
                            X.onclick = () => {
                                tds[i].insertAdjacentHTML('beforeend', '<i class="fa-solid fa-x"></i>');
                                resolve();
                            };
                        });
                        promise3 = new Promise((resolve) => {
                            A.onclick = () => {
                                tds[i].insertAdjacentHTML('beforeend', '<i class="fa-solid fa-triangle-exclamation"></i>');
                                resolve();
                            };
                        });
                        await Promise.race([promise1, promise2, promise3]);

                        tds[i].style.backgroundColor = "#FFFACD";
                        edit.style.display = 'flex';
                        add.style.display = 'none';
                    })();
                }
            }
        };
    }
};