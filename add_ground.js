let container = document.getElementById('container');
let newGround = document.getElementById('add_ground');
let line = 0

newGround.addEventListener('click', addGround)

function addGround() {
    line += 1;
    let groundHTML = `
        <div class='container_round'>
            <input id='player1_round${line}' type='number'>Player 1</input>
            <input id='player2_round${line}' type='number'>Player 2</input>
            <input id='player3_round${line}' type='number'>Player 3</input>
            <input id='player4_round${line}' type='number'>Player 4</input>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', groundHTML)

    const changeResultPlayer1 = document.getElementById(`player1_round${line}`);

    changeResultPlayer1.addEventListener('change', changeResult1);

    function changeResult1() {
        let result1 = document.getElementById(`player1_round${line}`).value;
        $.ajax({
            url: 'change_results1',
            type: 'POST',
            data: result1,
            success: function (data) {
                console.log(data);

            }
        })
    }
};



