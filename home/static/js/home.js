let data = [];
let statuses = [];
let types = [];
let categories = [];
let subcategories = [];

$.get('/api/statuses', (data, textStatus) => {
    statuses = data;
    statuses.forEach(status => {
        $('#status').append(`<option value="${status.id}">${status.name}</option>`)
    });
});
$.get('/api/types', (data, textStatus) => {
    types = data;
    types.forEach(type => {
        $('#type').append(`<option value="${type.id}">${type.name}</option>`)
    });
});
$.get('/api/categories', (data, textStatus) => {
    categories = data;
    $('#type').change(function () {
        const selectedValue = $(this).val();
        $('#subcategory')
            .empty()
            .append(`<option value="">Выберите подкатегорию</option>`);
        $('#category')
            .empty()
            .append(`<option value="">Выберите категорию</option>`);
        categories.forEach(category => {
            if (category.type == selectedValue) {
                $('#category').append(`<option value="${category.id}">${category.name}</option>`)
            }
        });
    });
});
$.get('/api/subcategories', (data, textStatus) => {
    subcategories = data;
    $('#category').change(function () {
        const selectedValue = $(this).val();
        $('#subcategory')
            .empty()
            .append(`<option value="">Выберите подкатегорию</option>`);
        subcategories.forEach(subcategory => {
            if (subcategory.category == selectedValue) {
                $('#subcategory').append(`<option value="${subcategory.id}">${subcategory.name}</option>`)
            }
        });
    });
});

$.get('/api/records', (new_data, textStatus) => {
    data = new_data;
    populateTable(data);
});

function populateTable(data) {
    const tbody = $('table tbody');
    tbody.empty();
    data.forEach(item => {
        const row = `
                <tr>
                    <td>${item.date}</td>
                    <td>${item.status_detail.name}</td>
                    <td>${item.type_detail.name}</td>
                    <td>${item.category_detail.name}</td>
                    <td>${item.subcategory_detail.name}</td>
                    <td>${item.sum}</td>
                    <td>${item.comment}</td>
                    <td><button class="edit-button" data-id="${item.id}">Редактировать</button></td>
                </tr>
            `;
        tbody.append(row);
    });
}

$(document).on('click', '.edit-button', function () {
    const recordId = $(this).data('id');
    window.location.href = `/transactions/edit/${recordId}/`;
});

$('.left-buttons button:first').click(function () {
    window.location.href = '/transactions/create';
});
$('.left-buttons button:last').click(function () {
    window.location.href = '/references';
});
$('.button-container button:last').click(function () {
    $('#modal-overlay').css("display", "flex").hide().fadeIn();
});
$('#close-modal').click(function () {
    $('#modal-overlay').fadeOut();
});

$('#apply-filters').click(function () {
    const dateFrom = $('#date-from').val();
    const dateTo = $('#date-to').val();
    const status = $('#status').val();
    const type = $('#type').val();
    const category = $('#category').val();
    const subcategory = $('#subcategory').val();

    const filteredData = data.filter(item => {
        return (!dateFrom || item.date >= dateFrom) &&
            (!dateTo || item.date <= dateTo) &&
            (!status || item.status_detail.id == status) &&
            (!type || item.type_detail.id == type) &&
            (!category || item.category_detail.id == category) &&
            (!subcategory || item.subcategory_detail.id == subcategory);
    });

    populateTable(filteredData);
    $('#modal-overlay').fadeOut();
});

$('#reset-filters').click(function () {
    $('#date-from').val('');
    $('#date-to').val('');
    $('#status').val('');
    $('#type').val('');
    $('#category').val('');
    $('#subcategory').val('');
});