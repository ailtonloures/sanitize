/**
 * Created by Ailton Loures on 27/06/2020 
 * 
 * @requires JQuery-v3.5.1
 * @version 0.1
 * @author Ailton Loures <ailton.loures99@gmail.com>
 */
(function ($) {

    /**
     * Automatize form submits
     * 
     * @author Ailton Loures <ailton.loures99@gmail.com>
     * 
     * @param {Object} callbacks { success : callable, error : callable, beforeSend: callable, complete: callable }
     * @returns {HTMLFormElement} 
     */
    $.fn.formAjaxSubmit = function ({
        success,
        error,
        beforeSend,
        complete
    }) {

        const _form = $(this);

        _form
            .on("submit", function (event) {
                event.preventDefault();

                const method = _form.attr('method');
                const actionUrl = _form.attr('action');
                const enctype = _form.attr('enctype');

                if (enctype && enctype === "multipart/form-data")
                    var formData = new FormData(_form[0]);
                else {
                    if (method === "GET")
                        var formData = _form.serialize();

                    if (method === "POST")
                        var formData = _form.serializeArray();
                }

                $.ajax({
                    type: method,
                    url: actionUrl,
                    data: formData,
                    success: function (response) { success && success(response, _form) },
                    error: function (reject) { error && error(reject, _form) },
                    beforeSend: function () { beforeSend && beforeSend(_form) },
                    complete: function () { complete && complete(_form) }
                });

            });

        return _form;
    }

    /**
     * Append small messages after elements of the form
     * 
     * @author Ailton Loures <ailton.loures99@gmail.com>
     * 
     * @param {Object} messages the messages in object
     * @param {Object} strings { classMessage : Array|String , styleMessage : Array|String } 
     * @returns {HTMLFormElement}
     */
    $.fn.formAppendMessages = function (messages, { classMessage, styleMessage }, inputClass = []) {
        const _form = $(this);

        _form.find("small.sm-message").remove();
        _form.find("[name]").removeClass(...inputClass);

        $.each(messages, function (target, value) {
            $.each(value, function (name, message) {
                _form
                    .find(`[name="${target}"]`)
                    .addClass(...inputClass)
                    .after(
                        `<small 
                            style="${styleMessage instanceof Array ? styleMessage.join(";") : (styleMessage || "")}"
                            class="sm-message ${classMessage instanceof Array ? classMessage.join(" ") : (classMessage || "")}">
                            ${message}
                        </small>`
                    );
            });
        });

        return _form;
    }

    $.fn.formReset = function () {
        const _form = $(this);

        _form.each(function() {
            this.reset();
        });
    }

})(jQuery);

