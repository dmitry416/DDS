let statuses = [];
let types = [];
let categories = [];
let subcategories = [];
let curData = ""
let subData = ""
let curID = -1;

function openModal(title, type, id = null, name = null, selected = null) {
    curID = id;
    switch (type) {
        case "status":
            curData = "statuses";
            break;
        case "type":
            curData = "types";
            break;
        case "category":
            curData = "categories";
            break;
        case "subcategory":
            curData = "subcategories";
            break;
    }
    $('#modal-title').text(title);
    $('#modal-input').val(name);
    $('#modal-select').empty();

    if (id == null) {
        $('#delete-button').hide();
    } else {
        $('#delete-button').show();
    }

    let options = [];
    $('#modal-select').show();
    if (type === 'category') {
        options = types;
        subData = 'type'
        $('#modal-select').append('<option value="">Выберите тип</option>');
    } else if (type === 'subcategory') {
        $('#modal-select').append('<option value="">Выберите категорию</option>');
        options = categories;
        subData = "category"
    } else {
        $('#modal-select').hide();
    }

    options.forEach(item => {
        $('#modal-select').append(`<option value="${item.id}">${item.name}</option>`);
    });

    $('#modal-select').val(selected);

    $('#modal-overlay').css("display", "flex").hide().fadeIn();
}

function updateAll() {
    $('#status-list').empty();
    $('#type-list').empty();
    $('#category-list').empty();
    $('#subcategory-list').empty();

    $.get('api/statuses', (data, textStatus) => {
        statuses = data;
        statuses.forEach(status => {
            $('#status-list').append(`<button onclick="openModal('Редактировать статус', 'status', ${status.id}, '${status.name}')">${status.name}</button>`)
        });
    });
    $.get('api/types', (data, textStatus) => {
        types = data;
        types.forEach(type => {
            $('#type-list').append(`<button onclick="openModal('Редактировать тип', 'type', ${type.id}, '${type.name}')">${type.name}</button>`)
        });
    });
    $.get('api/categories', (data, textStatus) => {
        categories = data;
        categories.forEach(category => {
            $('#category-list').append(`<button onclick="openModal('Редактировать категорию', 'category', ${category.id}, '${category.name}', ${category.type})">${category.name}</button>`)
        });
    });
    $.get('api/subcategories', (data, textStatus) => {
        subcategories = data;
        subcategories.forEach(subcategory => {
            $('#subcategory-list').append(`<button onclick="openModal('Редактировать подкатегорию', 'subcategory', ${subcategory.id}, '${subcategory.name}', ${subcategory.category})">${subcategory.name}</button>`)
        });
    });
}

function closeModal() {
    $('#modal-overlay').fadeOut();
}

function saveData() {
    const inputValue = $('#modal-input').val().trim();
    if ($('#modal-select').is(":hidden")) {
        if (inputValue) {
            if (curID == null) {
                $.post(`api/${curData}/`, {"name": inputValue}, () => {
                    updateAll();
                    closeModal();
                });
            } else {
                $.ajax({
                    url: `api/${curData}/${curID}/`,
                    type: "PUT",
                    data: {"name": inputValue},
                    success: () => {
                        updateAll();
                        closeModal();
                    },
                });
            }
        } else {
            alert('Поле не может быть пустым!');
        }
    } else {
        const selectValue = $('#modal-select').val();
        if (inputValue && selectValue) {
            if (curID == null) {
                $.post(`api/${curData}/`, {"name": inputValue, [subData]: selectValue}, () => {
                    updateAll();
                    closeModal();
                });
            } else {
                $.ajax({
                    url: `api/${curData}/${curID}/`,
                    type: "PUT",
                    data: {"name": inputValue, [subData]: selectValue},
                    success: () => {
                        updateAll();
                        closeModal();
                    },
                });
            }
        } else {
            alert('Поле не может быть пустым!');
        }
    }
}

function deleteData() {
    $.ajax({
        url: `api/${curData}/${curID}/`,
        type: "DELETE",
        success: () => {
            updateAll();
            closeModal();
        },
    });
}

$(document).ready(function () {
    updateAll();
    $('.add-button').on('click', function () {
        const columnTitle = $(this).siblings('h2').text();
        const type = $(this).prev().attr('id').replace('-list', '');
        openModal(`Добавить ${columnTitle}`, type);
    });
    $('#close-modal').on('click', closeModal);
    $('#save-button').on('click', saveData);
    $('#delete-button').on('click', deleteData);
    $('.back-button').on('click', function () {
        window.location.href = '/';
    });
});