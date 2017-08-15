# novi-plugin-rd-mailform
Novi Builder Plugin for visual [RD Mailform](https://github.com/TemplatemonsterPlugins/rd-mailform) customization

## How to Install
You should follow several simple steps to install this plugin:
* Copy the novi-plugin-rd-mailform.js file to your path/to/novibuilder/plugins folder.
* Launch NoviBuilder
 
## What you are able to do
* Change recipients of form destination
* Change SFTP settings to transfer form data

## Developer Settings
* querySelector — contains a css selector which defines the Plugin container.
* configLocation — contains the path to form configuration file.

## How to add RD Mailform on your page
If your website doesn't contain RD Mailform follow the instructions below to install it.

### Include RD Mailform files to Website
Copy the "assets/rd-mailform.js", "assets/rd-mailform.css" and "assets/php" to website's JS, CSS and PHP folders respectively and include this files to your website.

### Add RD Mailform HTML Layout

```html
<form class="rd-mailform" data-form-output="form-output-global" data-form-type="contact" method="post" action="php/rd-mailform.php">
    <div class="form-wrap">
        <input class="form-input" id="contact-name" type="text" name="name" data-constraints="@Required">
        <label class="form-label" for="contact-name">Your Name</label>
    </div>
    ...
    <button type="submit">Send Message</button>
</form>
<div class="snackbars" id="form-output-global"></div>
```

Example of RD Mailform markup using [Bootstrap](http://getbootstrap.com/) and [Font Awesome](http://fontawesome.io/):

```html
<!-- RD Mailform-->
    <section class="section">
        <div class="container">
            <form class="rd-mailform" data-form-output="form-output-global" data-form-type="contact" method="post"
                  action="php/rd-mailform.php">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-wrap">
                            <input class="form-input" id="contact-name" type="text" name="name"
                                   data-constraints="@Required">
                            <label class="form-label" for="contact-name">Your Name</label>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-wrap">
                            <input class="form-input" id="contact-phone" type="text" name="phone"
                                   data-constraints="@Numeric">
                            <label class="form-label" for="contact-phone">Phone</label>
                        </div>
                    </div>
                    <div class="col-xs-12">
                        <div class="form-wrap">
                            <label class="form-label" for="contact-message">Your Message</label>
                            <textarea class="form-input" id="contact-message" name="message"
                                      data-constraints="@Required"></textarea>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-wrap">
                            <input class="form-input" id="contact-email" type="email" name="email"
                                   data-constraints="@Email @Required">
                            <label class="form-label" for="contact-email">E-mail</label>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <button class="button button-block button-primary" type="submit">Send Message</button>
                    </div>
                </div>
            </form>
        </div>
    </section>
```

### Initialize RD Mailform
Initialize RD Mailform in JS by adding following block code:

```js
/**
     * Global variables
     */
    var $document = $(document),
        rdMailForm = $(".rd-mailform"),
        rdInputLabel = $(".form-label"),
        regulaElements = $("[data-constraints]");

    /**
     * Initialize All Scripts
     */
    $document.ready(function () {
        var isNoviBuilder = window.xMode;


        /**
         * attachFormValidator
         * @description  attach form validation to elements
         */
        function attachFormValidator(elements) {
            for (var i = 0; i < elements.length; i++) {
                var o = $(elements[i]), v;
                o.addClass("form-control-has-validation").after("<span class='form-validation'></span>");
                v = o.parent().find(".form-validation");
                if (v.is(":last-child")) {
                    o.addClass("form-control-last-child");
                }
            }

            elements
                .on('input change propertychange blur', function (e) {
                    var $this = $(this), results;

                    if (e.type !== "blur") {
                        if (!$this.parent().hasClass("has-error")) {
                            return;
                        }
                    }

                    if ($this.parents('.rd-mailform').hasClass('success')) {
                        return;
                    }

                    if ((results = $this.regula('validate')).length) {
                        for (i = 0; i < results.length; i++) {
                            $this.siblings(".form-validation").text(results[i].message).parent().addClass("has-error")
                        }
                    } else {
                        $this.siblings(".form-validation").text("").parent().removeClass("has-error")
                    }
                })
                .regula('bind');

            var regularConstraintsMessages = [
                {
                    type: regula.Constraint.Required,
                    newMessage: "The text field is required."
                },
                {
                    type: regula.Constraint.Email,
                    newMessage: "The email is not a valid email."
                },
                {
                    type: regula.Constraint.Numeric,
                    newMessage: "Only numbers are required"
                },
                {
                    type: regula.Constraint.Selected,
                    newMessage: "Please choose an option."
                }
            ];


            for (var i = 0; i < regularConstraintsMessages.length; i++) {
                var regularConstraint = regularConstraintsMessages[i];

                regula.override({
                    constraintType: regularConstraint.type,
                    defaultMessage: regularConstraint.newMessage
                });
            }
        }

        /**
         * isValidated
         * @description  check if all elements pass validation
         */
        function isValidated(elements) {
            var results, errors = 0;

            if (elements.length) {
                for (j = 0; j < elements.length; j++) {

                    var $input = $(elements[j]);
                    if ((results = $input.regula('validate')).length) {
                        for (k = 0; k < results.length; k++) {
                            errors++;
                            $input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
                        }
                    } else {
                        $input.siblings(".form-validation").text("").parent().removeClass("has-error")
                    }
                }

                return errors === 0;
            }
            return true;
        }


        /**
         * RD Input Label
         * @description Enables RD Input Label Plugin
         */

        if (rdInputLabel.length) {
            rdInputLabel.RDInputLabel();
        }


        /**
         * Regula
         * @description Enables Regula plugin
         */

        if (regulaElements.length) {
            attachFormValidator(regulaElements);
        }


        /**
         * RD Mailform
         * @version      3.2.0
         */
        if (rdMailForm.length) {
            var i, j, k,
                msg = {
                    'MF000': 'Successfully sent!',
                    'MF001': 'Recipients are not set!',
                    'MF002': 'Form will not work locally!',
                    'MF003': 'Please, define email field in your form!',
                    'MF004': 'Please, define type of your form!',
                    'MF254': 'Something went wrong with PHPMailer!',
                    'MF255': 'Aw, snap! Something went wrong.'
                };

            for (i = 0; i < rdMailForm.length; i++) {
                var $form = $(rdMailForm[i]);

                $form.attr('novalidate', 'novalidate').ajaxForm({
                    data: {
                        "form-type": $form.attr("data-form-type") || "contact",
                        "counter": i
                    },
                    beforeSubmit: function (arr, $form, options) {
                        if (isNoviBuilder)
                            return;

                        var form = $(rdMailForm[this.extraData.counter]),
                            inputs = form.find("[data-constraints]"),
                            output = $("#" + form.attr("data-form-output"));

                        output.removeClass("active error success");

                        if (isValidated(inputs)) {

                            form.addClass('form-in-process');

                            if (output.hasClass("snackbars")) {
                                output.html('<p><span class="icon fa fa-circle-o-notch fa-spin"></span><span>Sending</span></p>');
                                output.addClass("active");
                            }
                        } else {
                            return false;
                        }
                    },
                    error: function (result) {
                        if (isNoviBuilder)
                            return;

                        var output = $("#" + $(rdMailForm[this.extraData.counter]).attr("data-form-output")),
                            form = $(rdMailForm[this.extraData.counter]);

                        output.text(msg[result]);
                        form.removeClass('form-in-process');

                    },
                    success: function (result) {
                        if (isNoviBuilder)
                            return;

                        var form = $(rdMailForm[this.extraData.counter]),
                            output = $("#" + form.attr("data-form-output")),
                            select = form.find('select');

                        form
                            .addClass('success')
                            .removeClass('form-in-process');


                        result = result.length === 5 ? result : 'MF255';
                        output.text(msg[result]);

                        if (result === "MF000") {
                            if (output.hasClass("snackbars")) {
                                output.html('<p><span class="icon fa fa-check"></span><span>' + msg[result] + '</span></p>');
                            } else {
                                output.addClass("active success");
                            }
                        } else {
                            if (output.hasClass("snackbars")) {
                                output.html(' <p class="snackbars-left"><span class="icon fa fa-warning"></span><span>' + msg[result] + '</span></p>');
                            } else {
                                output.addClass("active error");
                            }
                        }

                        form.clearForm();

                        if (select.length) {
                            select.select2("val", "");
                        }

                        form.find('input, textarea').trigger('blur');

                        setTimeout(function () {
                            output.removeClass("active error success");
                            form.removeClass('success');
                        }, 3500);
                    }
                });
            }
        }
    });
```
