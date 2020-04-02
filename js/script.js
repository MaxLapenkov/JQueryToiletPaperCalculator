$(function () {
    function calculate() {
        const total = Number($('#total-length').val()) * 100 * 20;
        let usedPerDay = 0;
        let result = 0;
        
        $('#users-list .control__input').each(function(index, item) {
            
            usedPerDay = usedPerDay + Number($(item).val());
        })
        
        if ($('.control__button--active').data('type') === 'paper') {
            const papersCount = total / Number($('#paper-length').val());
            result = papersCount / usedPerDay;
        } else{
            result = total / usedPerDay;
        }

        $('#result').html(result.toFixed());
    }

    function generateUsers() {
        $('#users-list').empty();
        
        const currentType = $('.control__button--active').data('type') === 'paper' ?
            {unit : 'листочков', defaultValue: '1'} :
            {unit : 'см', defaultValue: '10'};
            

        for (let i = 1; i <= $('#users-count').val(); i++) {
            $('#users-list').append(`
            <div class="form-group form-group--row">
						<div class="form-group__title">Человек ${i} ${currentType.unit}</div>
						<div class="form-group__control control">
							<input type="text" class="control__input" value=${currentType.defaultValue}>
						</div>
                    </div>
            `);
        }
        calculate();
    }
    $('#total-length, #paper-length').keyup(calculate);
    $('#users-count').keyup(generateUsers);

    $('body').on('keyup', '#users-list .control__input', function() {
        calculate();
    })

    $('.control__button').click(function () {

        $(this)
            .addClass('control__button--active')
            .siblings()
            .removeClass('control__button--active');

        if ($(this).data('type') === 'paper') {
            $('#paper-length-block').removeClass('hidden')
        } else {
            $('#paper-length-block').addClass('hidden')
        }

        generateUsers();
        
    });
    
    generateUsers();
    calculate();
});