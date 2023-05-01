//処理実行可能状態（連続クリック防止用）
var canProcRun = true;

var keyCode = "";
KEY_CODE_BACKSPACE = 8;
KEY_CODE_DELETE = 46;


//（通常時=true　処理実行可、ボタン押下のイベント処理中=false　処理実行不可）
function JudgeRun() {

    if (canProcRun) {
        //イベント処理中はフラグをfalseにする。
        canProcRun = false;
        //クリック処理を実施
    } else {
        //イベント処理中は処理を実施しない
        //e.preventDefault();
        return false;
    }
};

//インプットタグ内でEnterキーを抑止
$(function () {
    $("input").keydown(function (e) {
        if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
            return false;
        } else {
            return true;
        }
    });
});

// tabChain
(function ($) {
    // タブキーでの項目移動を制限する
    $.fn.tabChain = function (option) {
        option = $.extend({}, { startIndex: -1 }, option);

        var chains = [];

        var init = function () {
            var first = chains[0];
            var last = chains[chains.length - 1];

            for (el in chains) {
                $(chains[el]).keydown(function (event) {
                    if (event.keyCode !== 9) {
                        return;
                    }
                    if (event.target === last && !event.shiftKey) {
                        first.focus();
                        return false;
                    }
                    else if (event.target === first && event.shiftKey) {
                        last.focus();
                        return false;
                    }
                })
            }
            if (option.startIndex > -1) {
                chains[option.startIndex].focus();
            }
        }

        this.each(function () {
            chains.push(this);
        })

        init();
    };
})(jQuery);

// accordion
$(function () {
    // アコーディオン
    setAccordionControl();
});
// アコーディオン開閉制御用
function setAccordionControl() {
    $('.fsc--accordion:not(.-open)').find('.fsc--accordion__body').hide();
    $('.fsc--accordion__label').off('click').off('keydown');  // イベントの重複追加を回避
    $('.fsc--accordion__label').on('click', function () {
        $paret = $(this).parent();
        $paret.toggleClass('-open')
            .find('.fsc--accordion__body').slideToggle();
        return false;
    }).on('keydown', function (e) {
        if (e.keyCode == 13 || e.keyCode == 32) {
            // Enter or Space
            $(this).trigger('click');
            return false;
        }
    })
}

// account_menu
$(function () {
    // アカウントメニュー開閉
    $('a.fsj-account_menu_open').on('click', function () {
        $('.fs-account_menu').show().toggleClass('-open');
        $('body').css('overflow', 'hidden');

        $('.fs-account_menu').on('click', 'a', function (e) {
            e.stopPropagation();
            if (this.href.indexOf('#logout') > -1) {
                $('.fsj-logout_confirm').find('.-primary').prop('href', 'IDログイン.html?logout=1').end()
                    .trigger('show');
            } else {
                //BSC UPD START---------------------------------------------------------      	
                //      location.replace(this.href)
                location.href(this.href)
                //BSC UPD END-----------------------------------------------------------        
            }
            return false;
        })

        $('.fs-account_menu').on('click', '.fs-account_menu__nav', function (e) {
            e.stopPropagation();
            return false;
        })
        $('.fs-account_menu').one('click', function () {
            $('a.fsj-account_menu_close').trigger('click')
            return false;
        })
        return false;
    })
    $('a.fsj-account_menu_close').on('click', function () {
        $('.fs-account_menu').off();
        $('.fs-account_menu').removeClass('-open').hide();
        $('body').css('overflow', 'auto');
        return false;
    })
    $('.fs-account_menu').hide();
    $('.fs-account_menu').find('a,button').tabChain({ startIndex: 1 });


    // 非会員ログアウト
    $('.fs-header_menu_logout').on('click', 'a', function (e) {
        e.stopPropagation();
        $('.fsj-logout_confirm').find('.-primary').prop('href', 'ログイン.html?logout=1').end()
            .trigger('show');
    });

});

// 言語選択
$(function () {
    $('.fs-header_language_select').on('click', function () {
        $('.fs-header_language_menu').css('display', '');
        $('.fs-header_language_menu').find('.fs-language_check').removeClass('fs-language_checked');
        var gengo = document.documentElement.lang;
        switch (gengo) {
            case "ja":
                $('.fs-gengo_ja').addClass('fs-language_checked');
                break;
            case "en":
                $('.fs-gengo_en').addClass('fs-language_checked');
                break;
            case "zh-Hans":
                $('.fs-gengo_zh-CHS').addClass('fs-language_checked');
                break;
            case "zh-Hant":
                $('.fs-gengo_zh-CHT').addClass('fs-language_checked');
                break;
            case "ko":
                $('.fs-gengo_ko').addClass('fs-language_checked');
                break;
        }
        return false;
    });

    $('.fs-footer_language_select').on('click', function () {
        $('.fs-footer_language_menu').css('display', '');
        $('.fs-footer_language_menu').find('.fs-language_check').removeClass('fs-language_checked');
        var gengo = document.documentElement.lang;
        switch (gengo) {
            case "ja":
                $('.fs-gengo_ja').addClass('fs-language_checked');
                break;
            case "en":
                $('.fs-gengo_en').addClass('fs-language_checked');
                break;
            case "zh-Hans":
                $('.fs-gengo_zh-CHS').addClass('fs-language_checked');
                break;
            case "zh-Hant":
                $('.fs-gengo_zh-CHT').addClass('fs-language_checked');
                break;
            case "ko":
                $('.fs-gengo_ko').addClass('fs-language_checked');
                break;
        }

        return false;
    });

    //$('.wovn-switch').on('click', function () {
    //    $('.fs-language_menu').css('display', 'none');
    //    return false;
    //});

    $('.fs-main').on('click', function () {
        $('.fs-header_language_menu').css('display', 'none');
        $('.fs-footer_language_menu').css('display', 'none');
    });

    $('.fs-footer').on('click', function () {
        $('.fs-header_language_menu').css('display', 'none');
        $('.fs-footer_language_menu').css('display', 'none');
    });
});

// dialog
$(function () {
    const dialog_close = function () {
        const $shadowbord = $(this).hasClass('fsc--shadowbord') ? $(this) : $(this).parents('.fsc--shadowbord');
        $shadowbord.css('display', 'none');
        $('body').css('overflow', 'auto');
        return false;
    }

    // ダイアログ操作
    // $('.fsc--shadowbord').trigger('show') で表示
    // $('.fsc--shadowbord').trigger('close') で非表示
    $('body').on('show', '.fsc--shadowbord', function () {
        const self = this;
        $('body').css('overflow', 'hidden');
        $(self).css('display', 'flex').find('input,select,button,a').tabChain({ startIndex: 1 });
        $('body').on('keydown', function (e) {
            // ESC
            if (e.keyCode === 27) {
                dialog_close.bind(self)();
            }
        });
    }).on('close', '.fsc--shadowbord', dialog_close)

    $('body')
        // ダイアログ内のクリック伝播で影背景クリックされるのを抑止
        .on('click', '.fs-dialog', function (e) {
            e.stopPropagation();
            //BSC ADD START---------------------------------------------------------
            e.preventDefault();
            //BSC ADD END-----------------------------------------------------------
        })
        // 影背景クリックでキャンセル
        //.on('click', '.fsc--shadowbord:not(.-noclick)', dialog_close)
        // とじる/キャンセルボタン
        .on('click', '.fs-dialog__close_button', dialog_close)
        // ｘボタン
        .on('click', '.fs-dialog__close', dialog_close)
});

// dialog
$(function () {
    const dialog_close = function () {
        const $shadowbord = $(this).hasClass('fsc--shadowbord_faq_denka') ? $(this) : $(this).parents('.fsc--shadowbord_faq_denka');
        $shadowbord.css('display', 'none');
        $('body').css('overflow', 'auto');
        return false;
    }

    // ダイアログ操作
    // $('.fsc--shadowbord_faq_denka').trigger('show') で表示
    // $('.fsc--shadowbord_faq_denka').trigger('close') で非表示
    $('body').on('show', '.fsc--shadowbord_faq_denka', function () {
        const self = this;
        $('body').css('overflow', 'hidden');
        $(self).css('display', 'flex').find('input,select,button,a').tabChain({ startIndex: 1 });
        $('body').on('keydown', function (e) {
            // ESC
            if (e.keyCode === 27) {
                dialog_close.bind(self)();
            }
        });
    }).on('close', '.fsc--shadowbord_faq_denka', dialog_close)

    $('body')
        // ダイアログ内のクリック伝播で影背景クリックされるのを抑止
        .on('click', '.fs-dialog_faq_denka', function (e) {
            e.stopPropagation();
            //BSC ADD START---------------------------------------------------------
            //e.preventDefault();
            //BSC ADD END-----------------------------------------------------------
        })
        // 影背景クリックでキャンセル
        //.on('click', '.fsc--shadowbord_faq_denka:not(.-noclick)', dialog_close)
        // とじる/キャンセルボタン
        .on('click', '.fs-dialog__close_button', dialog_close)
        // ｘボタン
        .on('click', '.fs-dialog__close', dialog_close)
});

// HTMLインジェクション対策
$(function () {
    //入力未確定状態
    let compositionState = false;

    $('.fsj-validation').on('compositionstart', function (e) {

        compositionState = true;
    });

    $('.fsj-validation').on('compositionend', function (e) {

        trim_validation_strings(e);
        compositionState = false;
    });


    $('.fsj-validation').on('input', function (e) {

        //入力未確定状態の場合は処理スキップ
        if (compositionState) {
            return;
        };

        trim_validation_strings(e);
    });

    const trim_validation_strings = function (e) {
        let trimValue = e.currentTarget.value;
        const pos = e.currentTarget.selectionStart;
        let trimLength = 0;

        if (trimValue.indexOf('<') != -1) {
            const tempValue = trimValue.replace(/</g, '');
            trimLength += trimValue.length - tempValue.length;
            trimValue = tempValue;
        }

        if (trimValue.indexOf('>') != -1) {
            const tempValue = trimValue.replace(/>/g, '');
            trimLength += trimValue.length - tempValue.length;
            trimValue = tempValue;
        }

        //&&##対応のため再帰的に実施
        while (trimValue.indexOf('&#') != -1) {
            const tempValue = trimValue.replace(/&#/g, '');
            trimLength += trimValue.length - tempValue.length;
            trimValue = tempValue;
        }

        if (trimLength > 0) {
            e.currentTarget.value = trimValue;
            e.currentTarget.setSelectionRange(pos - trimLength, pos - trimLength);

        }
    };
});


// enable_submit
//BSC DEL START---------------------------------------------------------
//$(function() {
//// サブミットボタンの活性制御
//BSC DEL END-----------------------------------------------------------
const enable_submit = function () {
    if ($('button.fs-submit').length !== 1) return true;

    // "fsj-submit_required"クラスを持つ項目すべてが入力されたら活性
    const $items = $('.fsj-submit_required');
    if ($items.length == 0) return false;

    disable = $items.filter(function () {
        $elm = $(this);
        if ($elm.prop('type') == 'checkbox') {
            return !$elm.prop('checked');
        } else {
            return $elm.val() == "";
        }
    }).length > 0;

    $('button.fs-submit').toggleClass('-disabled', disable).prop('disabled', disable)
}
//BSC ADD START---------------------------------------------------------
$(function () {
    // サブミットボタンの活性制御
    //BSC ADD END-----------------------------------------------------------  
    $('.fsj-submit_required').on('change input', enable_submit);
    enable_submit();
});

// goto_top
$(function () {
    // 先頭へボタンの表示制御
    const $pagetop = $('a.fsc--goto_top');
    const gotoTop = function () {
        const doch = $(document).innerHeight(); // ページ全体の高さ
        const winh = $(window).innerHeight(); // ウィンドウの高さ
        const bottomTop = doch - winh; // ページ全体の高さ - ウィンドウの高さ = ウィンドウのscrollTop最下端
        // ページの60%までスクロールしたら表示
        if ((doch - winh) > 100 && bottomTop * 0.6 <= $(window).scrollTop()) {
            $pagetop.fadeIn();
        } else {
            $pagetop.fadeOut();
        }
    }

    gotoTop();
    // 表示イベント
    $(window).scroll(gotoTop).resize(gotoTop);
    // ページ内リンクのスクロール移動
    $pagetop.click(function (e) {
        const time = 500;
        $("html, body").animate({ scrollTop: 0 }, time, "swing");
        return false;
    });
});

//明細ダウンロードへのスクロール
$(function () {
    // 先頭へボタンの表示制御
    const $dlLink = $('a.fs-detail_usage__link');

    // ページ内リンクのスクロール移動
    $dlLink.click(function (e) {
        const time = 500;
        //要素のページ上部からの絶対値を取得（ページトップから現在のスクロール位置 + スクロール位置から取得したい要素の絶対値）
        var content_top = window.pageYOffset + document.getElementById('pdf_download').getBoundingClientRect().top;
        $("html, body").animate({ scrollTop: content_top }, time, "swing");
        return false;
    });
});


$(function () {
    // ヒントアイコンクリック
    // ポップアップダイアログテンプレート
    const dialog_src = [
        '<div class="fsc--shadowbord">',
        '<div class="fs-dialog">',
        '<div class="fs-dialog__container"><a class="fs-dialog__close" href="#" tabindex="1"><i class="fsi--close"></i></a>',
        '<div class="fs-dialog__content">',
        '<div class="fs-dialog__title3">#{title}</div>',
        '<div class="fs-dialog__body"></div>',
        '<div class="fs-dialog__button_one">',
        '<button class="fs-button -max150fix fs-dialog__close_button">閉じる</button>',
        '</div>',
        '</div>',
        '</div>',
        '</div>',
    ].join('\n');


    $('.fsc--hint').on('click', function () {
        const $hint = $(this)
        if ($hint.data('title')) {
            // テンプレートにタイトルと本体を埋め込み
            const $popup = $(dialog_src.replace('#{title}', $hint.data('title')))
            const $content = $hint.find('.fsc--hint_content').children().clone()
            $popup.find('.fs-dialog__body').append($content)
            //--- fa-bodyクラス 複数時にポップアップを複数示しないための対応（開始）------------
            $('.fs-body').first().append($popup);
            //--- fa-bodyクラス 複数時にポップアップを複数示しないための対応（終了）------------
            // 閉じた際にDOM削除
            $popup.on('hide', function () {
                $popup.remove();
            })
            $popup.trigger('show')
            $("[tabindex=1]").focus();
            return false;
        }
    })
});


// key_assgin
$(function () {
    // トグルスイッチ
    $('.fs-toggle_switch').on('keydown', function (e) {
        const $checkbox = $(this).find('input');
        if (e.keyCode == 37) {
            $checkbox.prop('checked', false).trigger('change');
            return false;
        } else if (e.keyCode == 39) {
            $checkbox.prop('checked', true).trigger('change');
            return false;
        } else if (e.keyCode == 13 || e.keyCode == 32) {
            // Enter or Space
            $checkbox.prop('checked', !$checkbox.prop('checked')).trigger('change');
            return false;
        }
    })
});

// notify_setting
$(function () {
    // 通知内容・通知先設定の顧客選択
    $('.fs-customer_select2').on('change', function (e) {
        const $checked = $(this).find('input[type=radio]:checked')

        /* TODO: 顧客選択結果の反映 */
        const $card = $checked.next();
        const $current = $('.fs-config__customer_current')

        let val;
        val = $card.find('.fs-customer_card__type_label').text()
        $current.find('.fs-config_notice_customer__type_label').text(val)

        const $sym = $card.find('.fs-customer_card__type_symbol').clone()
        $current.find('.fs-config_notice_customer__type_symbol').empty()
            .append($sym.removeClass(['fs-customer_card__type_symbol', '-customer_card']))

        val = $card.find('.fs-customer_card__customer_number').text()
        $current.find('.fs-config_notice_customer__customer_number').text(val)
        //BSC ADD START---------------------------------------------------------
        $current.find('.fs-config_notice_customer__customer_number_hidden').val(val)
        //BSC ADD END-----------------------------------------------------------

        val = $card.find('.fs-customer_card__customer_address').text()
        $current.find('.fs-config_notice_customer__customer_address').text(val)

        val = $card.find('.fs-customer_card__nickname').text()
        $current.find('.fs-config_notice_customer__nickname').text(val)
        //BSC ADD START---------------------------------------------------------
        document.getElementById('body_0_BtnKeiyakuJohoHenko').click();
        //BSC ADD END-----------------------------------------------------------
    })

    // 通知先選択
    $('select.fs-form_item__select').on('change', function () {
        const $select = $(this);
        const $root = $select.parents('dl.fs-config_notice_target');
        const $input = $root.find('input.fs-form_item__textbox');
        //BSC DEL START---------------------------------------------------------
        //  $('dd.fs-config_notice_target__status').empty();
        //BSC DEL END-----------------------------------------------------------
        $input.val('');
        if ($select.val()) {
            $input.prop('disabled', false);
            switch ($select.val()) {
                case 'mail':
                    $input.prop({ 'type': 'mail', placeholder: 'メールアドレス（半角英数字）' });
                    break;
                case 'SMS':
                    $input.prop({ 'type': 'tel', placeholder: '電話番号（ハイフン不要）' });
                    break;
                case 'LINE':
                    $input.prop({ 'type': 'tel', placeholder: '電話番号（ハイフン不要）' });
                    $('#SettingLINEShadowbord').css('display', 'flex');
                    $('body').css('overflow', 'hidden');
                    break;
                default:
                    $input.prop({ 'type': 'text', placeholder: '未設定' });
                    break;
            }
        } else {
            $input.prop({ 'type': 'text', placeholder: '未設定', 'disabled': true });
        }
    })

    // 通知する内容の選択の表示
    const $notice_item_select = $('.fs-config_notice__base_list')
    $notice_item_select.on('change', 'input[type="checkbox"]', function () {
        const $checkbox = $(this);
        const $status = $checkbox.parents('.fs-config_notice_base').find('.fsc-sns_status')
        if ($checkbox.prop('checked')) {
            $status.toggleClass('-unspecified', false).text('表示する')
        } else {
            $status.toggleClass('-unspecified', true).text('表示しない')
        }
    })
    // 初期表示
    $notice_item_select.find('input[type="checkbox"]').trigger('change');
});

// receive_setting
$(function () {
    // 受信可否の選択の表示
    const $receive_item_select = $('.fs-config_receive__base_list')
    $receive_item_select.on('change', 'input[type="checkbox"]', function () {
        const $checkbox = $(this);
        const $status = $checkbox.parents('.fs-config_receive_base').find('.fsc-sns_status');
        if ($checkbox.prop('checked')) {
            $status.toggleClass('-unspecified', false).text('受信する');
        } else {
            $status.toggleClass('-unspecified', true).text('受信しない');
        }
    })
    // 初期表示
    $receive_item_select.find('input[type="checkbox"]').trigger('change');
});

$(function () {
    // HTML5のバリデーション機能を無効化
    $('form').each(function () {
        this.setAttribute('novalidate', 'novalidate')
    })
});

// password
$(function () {
    // パスワード表示トグル
    $('input[type="password"][maxlength="20"]')
        .wrap('<div class="fsc--password-wrap" />')
        .after('<i class="fsc--eye fsc--eye-off" />')
        .next().on('click', function () {
            //BSC UPD START---------------------------------------------------------
            //    const eye_on = $(this).hasClass('fsc--eye-on');
            //    const input = $(this).prev();
            var eye_on = $(this).hasClass('fsc--eye-on');
            var input = $(this).prev();
            //BSC UPD END-----------------------------------------------------------
            //------ エラーメッセージ表示時に入力タグまで戻る対応（開始）------------
            while (input.get(0).tagName.toUpperCase() != 'INPUT') {
                input = input.prev();
            }
            //------ エラーメッセージ表示時に入力タグまで戻る対応（終了）------------
            if (eye_on) {
                input.attr("type", "password");
            } else {
                input.attr("type", "text");
            }
            $(this).toggleClass('fsc--eye-on fsc--eye-off');
        });
});

// resize
$(function () {
    // フッターの下位置固定
    const setFooter = function () {
        const wh = $(window).height();
        const fh = $('.fs-footer').outerHeight();
        $(".fs-main").css('min-height', wh - fh);
        $(".fs-top").css('min-height', wh - fh);
    };
    $(window).on('resize', setFooter);
    setFooter();
});


// selectbox
// ドロップダウンの選択先表示設定
const setSelectedClass = function ($select, $cehcked) {
    $select.removeClass('-selected')
        .find('.-checked').removeClass('-checked')

    if ($cehcked.length == 1) {
        // 選択された選択肢にクラスをセット
        $cehcked.closest('li.fs-slider_select__option').addClass('-checked')
        // 選択された事を示すクラスをプルダウン枠にセット
        $select.addClass('-selected')
    }
};

$(function () {
    $('.fs-slider_select')
        // 選択肢表示
        .on('click', function () {
            $selectbox = $(this)

            // 重複起動の抑止
            if ($selectbox.hasClass('-changeing')) {
                return false;
            }
            $selectbox.addClass('-changeing')

            // 対象のselectボックスのクローンを作成
            $ul = $selectbox.find('> ul');
            $clone = $ul.clone().wrap('<div class="fs-slider_select"></div>')
                .css({
                    width: $ul.outerWidth(),
                    position: 'absolute',
                    'z-index': 1000,
                })

            // 選択の終了処理
            const destroy = function () {
                $selectbox.removeClass('-changeing')
                $clone.off()
                $clone.parent().remove()
                $(window).off('resize.slider_select')
            }

            // bodyの末尾に追加
            $('body').append($clone.parent())
            $clone.offset($ul.offset())
            $clone.addClass('-open')
            $clone.find('input[type=radio]').each(function () {
                this.name = this.name + '_clone'
            })
            $clone.on('click', 'input[type=radio]', function () {
                // 選択結果の反映
                $ul.find('input[type=radio]').attr('checked', false)
                const $radio = $ul.find('input[value="' + this.value + '"]');
                $radio.prop('checked', true).attr('checked', true)
                $radio.trigger('change')
                if (!$ul.hasClass('-reset')) {
                    setSelectedClass($ul, $radio);
                    // 2021.02.15 イベント発火の邪魔になるので削除
                    //} else {
                    //  $radio.prop('checked', false)
                }

                destroy()
            })
                .on('click', '.fs-slider_select__close_backstage', destroy)
                .on('change', 'input.fs-slider_select__expand', destroy)

            const $radios = $clone.find('input[type=radio]');
            $radios.on('keydown', function (e) {
                const $checked = $radios.filter(':checked');
                const idx = $radios.index($checked);

                if (e.keyCode == 38) {
                    // 上キー
                    if (idx > 0) {
                        $radios.filter(':eq(' + (idx - 1) + ')').prop('checked', true);
                    }
                } else if (e.keyCode == 40) {
                    // 下キー
                    const $next = $radios.filter(':eq(' + (idx + 1) + ')');
                    if ($next.length) {
                        $next.prop('checked', true);
                    }
                } else if (e.keyCode == 13 || e.keyCode == 32) {
                    // Enterキー, Spaceキー
                    $checked.trigger('click');
                    $selectbox.focus();
                } else if (e.keyCode == 27) {
                    // ESCキー
                    destroy();
                }

                return false;
            })
            // 初期選択
            if ($radios.filter(':checked').length == 1) {
                $radios.filter(':checked').focus()
            } else {
                $radios.filter(':eq(0)').focus()
            }

            //BSC ADD START---------------------------------------------------------
            // 対象外をグレーアウト
            $radios.filter(':disabled').each(function () {
                $(this).parent().next().css("background-color", "gray");
            })
            //BSC ADD END-----------------------------------------------------------

            $(window).on('resize.slider_select', function () {
                // リサイズ対応
                $clone.offset($ul.offset())
                    .css({ width: $ul.outerWidth() })
            })

            return false;
        }).on('change', function () {
            const $select = $(this);
            const $cehcked = $select.find('input[type=radio]:checked')

            // 2021.02.09 delete
            //if (!$select.hasClass('-reset')) {
            //  setSelectedClass($select, $cehcked)
            //}
        }).on('keydown', function (e) {
            // Spaceキー、 Enterキー、下キー
            if (e.keyCode == 32 || e.keyCode == 13 || e.keyCode == 40) {
                $(this).trigger('click');
                return false;
            }
        })
        .each(function () {
            const $select = $(this);
            const size = $select.find('.fs-slider_select__option').length;
            if (size <= 1) {
                $select.addClass('-one').off()
                //BSC ADD START---------------------------------------------------------
                $('.fs-customer_select').addClass('-one').off()
                //BSC ADD END-----------------------------------------------------------
            }
            setSelectedClass($select, $select.find('input[type=radio]:checked'));
        })

});

// slider_and_list
$(function () {
    let cardSwiper;
    let publicitySlider;
    let cardList;
    let currentSlide = parseInt($('.currentSlide').val());

    // 契約者カードのスライダー
    const createCardSwipter = function () {
        const setTabIndex = function () {
            const cards = $('.fs-card_slider').find('.swiper-slide')
            cards.find('button,input,a').attr('tabindex', '-1')
            cards.filter('.swiper-slide-active').find('button,input,a').attr('tabindex', '0')
        }
        cardSwiper = new Swiper('.fs-card_slider', {
            slideToClickedSlide: false,
            navigation: {
                nextEl: '.fs-card_slider__next',
                prevEl: '.fs-card_slider__prev'
            },
            pagination: {
                el: '.fs-card_slider__pagination',
                type: 'bullets',
                clickable: true
            },
            spaceBetween: 30,
            slidesPerView: 1.8,
            slidesPerGroup: 1,
            observer: true,
            observeParents: true,
            loop: true,
            initialSlide: currentSlide,
            on: {
                slideChangeTransitionEnd: function () {
                    if (cardSwiper) {
                        try {
                            cardSwiper.loopFix()
                        } catch (e) { }
                    }
                },
                init: setTabIndex,
                slideChange: function () { setTimeout(setTabIndex, 1) },
                destroy: function () {
                    $('.fs-card_slider').find('button,input,a').attr('tabindex', null)
                }
            },
            loopAdditionalSlides: 1,
            centeredSlides: true,
            watchOverflow: true,
            breakpoints: {
                800: {
                    slidesPerView: 1.08,
                    spaceBetween: 10,
                }
            }
        });

        $('.fs-top_card__detail_button').removeClass('fs-top_animation_pika');
        setTimeout(function () {
            $('.fs-top_card__detail_button').addClass('fs-top_animation_pika');
        }, 1);
    }

    // 広告のスライダー
    const createPublicitySlider = function () {
        if (publicitySlider) publicitySlider.destroy();

        if ($('.fs-top_publicity_slider').find('.swiper-slide').length > 1) {
            const setTabIndex = function () {
                const cards = $('.fs-top_publicity_slider').find('.swiper-slide')
                cards.find('a').attr('tabindex', '-1')
                cards.filter('.swiper-slide-active').find('a').attr('tabindex', '0')
            }

            publicitySlider = new Swiper('.fs-top_publicity_slider', {
                slideToClickedSlide: true,
                navigation: {
                    nextEl: '.fs-top_publicity_slider__next',
                    prevEl: '.fs-top_publicity_slider__prev'
                },
                // 自動再生ディレイ3秒
                autoplay: {
                    //BSC UPD START---------------------------------------------------------
                    //        delay: 4000,
                    delay: 3000,
                    //BSC UPD END-----------------------------------------------------------
                },
                spaceBetween: 0,
                slidesPerView: 1,
                slidesPerGroup: 1,
                loop: true,
                on: {
                    init: setTabIndex,
                    slideChange: function () { setTimeout(setTabIndex, 1) }
                },
                centeredSlides: true,
                watchOverflow: true,
                observer: true,
                observeParents: true,
            });
        } else {
            $('.fs-top_publicity_slider__next').hide()
            $('.fs-top_publicity_slider__prev').hide()
        }
    }

    // リスト表示モード
    const createCardList = function () {
        const $list = $('li.fs-card_list__card');
        const $select = $('input:radio[name="body_0$page_size"]');
        const $change = $('ul.fs-top_page_change');
        const $back = $('li.fs-top_page_change__back');
        const $next = $('li.fs-top_page_change__next');
        const $current = $('span.fsj-current');
        const $current_hidden = $('#body_0_HiddenListCurrentPageNum');
        const $page_num = $('span.fsj-page_num');
        var $select_num = parseInt($('input:radio[name="body_0$page_size"]:checked').val().replace(/[^0-9]/g, ""));

        const list_len = $list.length;
        let pages = 1;
        let current = parseInt($current.text());

        // ページサイズ変更
        const setPageSize = function () {
            $select_num = parseInt($('input:radio[name="body_0$page_size"]:checked').val().replace(/[^0-9]/g, ""));
            pages = Math.ceil(list_len / $select_num);
            current = 1;
            setControle();
        }

        // ページ切り替え項目の活性制御
        const setPageChangerEnable = function ($elm, enabled) {
            $elm.toggleClass('-end', !enabled).attr('tabindex', (enabled ? 0 : null));
        }
        // ページ選択制御
        const setControle = function () {
            $current.text(current)
            $current_hidden.val(current)
            $page_num.text(pages)

            if (pages == 1) {
                // 1ページのみ、切り替え無し
                $change.toggleClass('-showall', true)
                // 全体表示
                $list.show()
            } else {
                // ページ切り替えあり
                $change.toggleClass('-showall', false)
                if (current == 1) {
                    setPageChangerEnable($back, false);
                    setPageChangerEnable($next, true);
                } else if (current == pages) {
                    setPageChangerEnable($back, true);
                    setPageChangerEnable($next, false);
                } else {
                    setPageChangerEnable($back, true);
                    setPageChangerEnable($next, true);
                }

                // 範囲表示
                const page_size = $select_num;
                const start = current == 1 ? 0 : (current - 1) * page_size;
                const end = current * page_size;
                $list.hide().slice(start, end).show()
            }

            //$('.fs-top_card__detail_button').removeClass('fs-top_animation_pika');
            //setTimeout(function () {
            //    $('.fs-top_card__detail_button').addClass('fs-top_animation_pika');
            //}, 1);

        }

        $select.on('change', setPageSize);
        // ページ選択イベント
        $back.on('click', function () {
            if (current <= 1) return false;
            current -= 1;
            setControle();
            return true;
        });
        $next.on('click', function () {
            if (current >= pages) return false;
            current += 1;
            setControle();
            return true;
        });

        pages = Math.ceil(list_len / $select_num);
        current = parseInt($current.text());
        setControle();

        return {
            destroy: function () {
                $list.show();
                $select.off();
                $back.off();
                $next.off();
            }
        }
    }

    // TabIndex設定
    const setItemTabIndex = function () {
        const is_list = $('.fsj-slider_change').hasClass('-list');
        $('.fs-top_control__button--list').attr('tabindex', (is_list ? null : 0))
        $('.fs-top_control__button--slider').attr('tabindex', (is_list ? 0 : null))
    }

    // スライダー/リスト切り替え
    const changeSliderList = function () {
        const $control = $('.fsj-slider_change');
        const $button = $(this);
        const $direction = $('.SlideDirection');

        if ($control.hasClass('-slider') && $button.hasClass('fs-top_control__button--list')) {
            // リスト
            if (cardSwiper) cardSwiper.destroy(true, true);
            $('.fs-card_slider__parts').hide();
            $('.fs-card_list').toggleClass('-list_mode', true);
            $control.toggleClass('-list', true).toggleClass('-slider', false)
            $direction.val("vertical");
            $('span.fsj-current').text(1);
            $('#body_0_HiddenListCurrentPageNum').val(1);
            cardList = createCardList();
        } else
            if ($control.hasClass('-list') && $button.hasClass('fs-top_control__button--slider')) {
                // スライダー
                const $list = $('li.fs-card_list__card');
                // 全体表示
                $list.show()
                $('.fs-card_slider__parts').show();
                $('.fs-card_list').toggleClass('-list_mode', false);
                $control.toggleClass('-list', false).toggleClass('-slider', true)
                if (cardList) cardList.destroy();
                $direction.val("horizontal");
                currentSlide = 0;
                createCardSwipter();
            }
        setItemTabIndex();

    };

    // 表示切替ボタン
    $('.fsj-slider_change').on('click', '.fs-top_control__button--list, .fs-top_control__button--slider', changeSliderList);

    // 初期設定
    const initialize = function () {

        $('.swiper-container').css('visibility','');
        $('.fsj-slider_change').css('visibility','');

        // tabindex設定とキーイベント設定
        $('.fs-top_control__button--list, .fs-top_control__button--slider, .fs-top_page_change__back, .fs-top_page_change__next')
            .on('keydown', function (event) {
                if (event.keyCode == 13 || event.keyCode == 32) {
                    $(this).click();
                    return false;
                }
            })
        setItemTabIndex();

        const $direction = $('.SlideDirection');

        if ($('.fs-card_list__card').length > 1) {
            // 複数カード表示
            $('.fsj-slider_change').show();

            if ($direction.val() == "horizontal") {
                //スライダー表示
                $('.fsj-slider_change').toggleClass('-slider', true);
                $('.fs-card_list').toggleClass('-list_mode', false);
                $('.fs-card_slider__parts').show();
                createCardSwipter();
            } else {
                //リスト表示
                $('.fsj-slider_change').toggleClass('-slider', false);
                $('.fsj-slider_change').toggleClass('-list', true);
                $('.fs-card_list').toggleClass('-list_mode', true);
                $('.fs-card_slider__parts').hide();
                createCardList();
            }

        } else {
            // １件のみ表示
            $('.fsj-slider_change').hide();
            $('.fs-card_slider__parts').hide();
            $('.fs-card_list').toggleClass('-list_mode', true);
        }

    }

    initialize();
    createPublicitySlider();

    //$(window).on('slider_initialize', initialize);
});

// terms_of_service
$(function () {
    // 利用規約・会員規約
    const $terms_of_service = $('.fs-form_terms_of_service');
    if ($terms_of_service.length > 0) {
        // 会員規約を末尾までスクロールしなければ、同意ボタンは活性化させない
        $('dd.fs-form_terms_of_service__scroll').on('scroll', function () {
            //全長を取得
            const scrollHeight = this.scrollHeight;
            //スクロールした高さを取得
            const $term = $('dd.fs-form_terms_of_service__scroll');
            scrollPosition = $term.height() + $term.scrollTop();

            //スクロールの位置が下部何%の範囲に来た場合の処理(5%)
            if ((scrollHeight - scrollPosition) / scrollHeight <= 0.05) {
                $terms_of_service.find('input.fs-form_confirmation__checkbox').removeAttr('disabled');
            }
        })
        $terms_of_service.find('input.fs-form_confirmation__checkbox').on('click', function () {
            $terms_of_service.find('.fs-item_alert').css('display', this.checked ? 'none' : 'inline-block');
        })

        if (document.getElementById('body_0_ChkRiyoKiyaku').checked) {
            $('input.fs-form_confirmation__checkbox').removeAttr('disabled');
            $terms_of_service.find('.fs-item_alert').css('display', 'none');
        }

    }
});

// tile
$(function () {
    // 中央揃えタイルの並び制御
    // https://qiita.com/QUANON/items/e14949abab3711ca8646
    const empty_cells = []
    const len = $('.fsj-tile_set').children().length;
    for (i = 0; i < len; i++) {
        empty_cells.push($('<div>', { class: 'fs-top_tile_set__tile fs-top_tile_set__empty_tile' }));
    }
    $('.fsj-tile_set').append(empty_cells);
});

// toast
// トースト表示
let $toast = null;
const toast = function (msg) {
    if ($toast) $toast.stop().remove();
    $toast = $('<div>').addClass('fs-toast').html(msg.replace(/\n/g, '<br />'));
    $('body').append($toast);
    const h = $toast.outerHeight();
    $toast.css({ top: -h, visibility: 'visible' })
        .animate({ top: 50 }, 400, 'swing')
        .delay(4000)
        .animate({ opacity: 0 }, 400)
        .promise().then(function () {
            $toast.remove();
        });
};


// transition_confirm
$(function () {
    // 入力中のページ内遷移確認
    let changed = false;
    $('.-transition_confirm').on('change', 'input,select', function () {
        changed = true;
    }).on('click', '.fs-submit', function () {
        changed = false;
    }).on('reset_change', function () {
        changed = false;
    })

    // 確認ダイアログ起動
    const transition_confirm = function (goto_url) {
        $dialog = $('.fsj-transition_confirm');
        $dialog.trigger('show');
        $dialog.find('.-primary').one('click', function () {
            location.href = goto_url;
        })
    }

    $('a').on('click', function (e) {
        const linkUrl = $(this).attr('href');
        if (changed && linkUrl != '#') {
            // リンクを一旦キャンセル
            e.preventDefault();
            // 確認ダイアログ起動
            transition_confirm(linkUrl);
        }
    })
});

// tutorial
// チュートリアル
const popup_tutorial = function () {
    const setTabIndex = function () {
        const cards = $('.fs-top_tutorial__slide_container').find('.swiper-slide')
        cards.find('button,img,a').attr('tabindex', '-1')
        cards.filter('.swiper-slide-active').find('button,img,a').attr('tabindex', '0')
    }

    $('.fs-top_tutorial').show();
    let tutorialSwiper = new Swiper('.fs-top_tutorial__slide_container', {
        centeredSlides: true,
        watchOverflow: true,
        slidesPerView: 1,
        observer: true,
        observeParents: true,
        pagination: {
            el: '.fs-top_tutorial__pagination',
            clickable: true,
            type: 'bullets',
        },
        navigation: {
            nextEl: '.fs-top_tutorial__navigate--next',  //「次へ」ボタンの要素のセレクタ
            prevEl: '.fs-top_tutorial__navigate--prev',  //「前へ」ボタンの要素のセレクタ
        },
        on: {
            init: setTabIndex,
            slideChange: function () { setTimeout(setTabIndex, 1) }
        }
    });
    // Tab制御
    $('.fs-top_tutorial__slide_container').on('keydown', '.swiper-slide [tabindex=0]', function (event) {
        if (event.keyCode == 9) {
            const $slider = $('.fs-top_tutorial__slide_container')
            const $slides = $slider.find('.swiper-slide')

            if (event.shiftKey) {
                // 逆送り
                // ページ内の先頭タブ位置か
                if ($slider.find('.swiper-slide-active').find('[tabindex]:eq(0)').is(':focus')) {
                    // 先頭ページなら通常Shift+Tab
                    if ($slides.filter(':eq(0)').hasClass('swiper-slide-active')) { return true }
                    tutorialSwiper.slidePrev();
                    setTimeout(function () {
                        $slider.find('.swiper-slide-active').find('[tabindex]:eq(0)').focus()
                    }, 300)
                    return false;
                }
            } else {
                // 順送り
                // ページ内の最終タブ位置か
                if ($slider.find('.swiper-slide-active').find('[tabindex]:eq(-1)').is(':focus')) {
                    // 最終ページなら通常Tab
                    if ($slides.filter(':eq(-1)').hasClass('swiper-slide-active')) { return true }
                    tutorialSwiper.slideNext();
                    setTimeout(function () {
                        $slider.find('.swiper-slide-active').find('[tabindex]:eq(0)').focus()
                    }, 300)
                    return false;
                }
            }

        }
    })

    // ダイアログ内のクリック伝播で影背景クリックされるのを抑止
    $('body').on('click.tutorial', '.fs-top_tutorial__body', function (e) {
        e.stopPropagation();
    })

    const destroy = function () {
        tutorialSwiper.destroy();
        $('body').off('click.tutorial').css('overflow', 'auto');
        $('.fs-top_tutorial').hide();
        return false;
    }

    $('body').css('overflow', 'hidden');
    $('.fs-top_tutorial_page__button').one('click', destroy)
    //BSC ADD START---------------------------------------------------------
    var val = document.getElementById('body_0_AdvertisementCount').value;
    if (val != 0) {
        $('.fs-top_tutorial_page__button').one('click', popup_advertisement)
    }
    else
    {
        $('.fs-top_tutorial_page__button').one('click', popup_torikeshizumiConfirm)
    }
    //BSC ADD END-----------------------------------------------------------
    $('.fs-top_tutorial__close').one('click', destroy)
    //BSC ADD START---------------------------------------------------------
    var val = document.getElementById('body_0_AdvertisementCount').value;
    if (val != 0) {
        $('.fs-top_tutorial__close').one('click', popup_advertisement)
    }
    else {
        $('.fs-top_tutorial_page__button').one('click', popup_torikeshizumiConfirm)
    }

    //BSC ADD END-----------------------------------------------------------
    $('.fs-top_tutorial').find('[tabindex]').tabChain()
    $('.fs-top_tutorial__navigate--next').focus()

};

// 広告ポップアップ
const popup_advertisement = function () {
    $('.fs-top_advertisement').show();
    if ($('.fs-top_advertisement__slide_container').find('.swiper-slide').length > 1) {
        const setTabIndex = function () {
            const cards = $('.fs-top_advertisement__slide_container').find('.swiper-slide')
            cards.find('a').attr('tabindex', '-1')
            cards.filter('.swiper-slide-active').find('a').attr('tabindex', '0')
        }

        let advertisementSwiper = new Swiper('.fs-top_advertisement__slide_container', {
            centeredSlides: true,
            watchOverflow: true,
            autoHeight: true,
            spaceBetween: 20,
            slidesPerView: 1,
            slidesPerGroup: 1,
            loop: true,
            pagination: {
                el: '.fs-top_advertisement__pagination',
                clickable: true,
                type: 'bullets',
                observer: true,
                observeParents: true,
            },
            navigation: {
                nextEl: '.fs-top_advertisement__navigate--next',  //「次へ」ボタンの要素のセレクタ
                prevEl: '.fs-top_advertisement__navigate--prev',  //「前へ」ボタンの要素のセレクタ
            },
            on: {
                init: setTabIndex,
                slideChange: function () { setTimeout(setTabIndex, 1) }
            }
        });
    } else {
        $('.fs-top_advertisement__navigate').hide()
        $('.fs-top_advertisement__pagination').hide()
    }
    // ダイアログ内のクリック伝播で影背景クリックされるのを抑止
    $('body').on('click.advertisement', '.fs-top_advertisement__body', function (e) {
        e.stopPropagation();
    })
    $('body').css('overflow', 'hidden');

    const destroy = function () {
        //BSC UPD START---------------------------------------------------------
        //  advertisementSwiper.destroy();
        //  $('body').off('click.advertisement');
        $('body').off('click.advertisement').one('click', destroy);
        //BSC UPD END-----------------------------------------------------------
        $('.fs-top_advertisement').hide();
        $('body').css('overflow', 'auto');

        var val = document.getElementById('body_0_TorikeshizumiKeiyakuCheck').value;
        if (val != 0) {
            $('#TorikeshizumiKeiyakuShadowbord').css('display', 'flex');
        }
        $('.fs-top_card__detail_button').addClass('fs-top_animation_pika');

    }


    $('.fs-top_advertisement__close').one('click', destroy)
    $('.fs-top_advertisement').find('[tabindex]').tabChain()
    $('.fs-top_advertisement__navigate--next').focus()

    $('.fs-top_card__detail_button').removeClass('fs-top_animation_pika');


};

// 取消し済み契約紐づけ解除ポップアップ
const popup_torikeshizumiConfirm = function () {
        var val = document.getElementById('body_0_TorikeshizumiKeiyakuCheck').value;
        if (val != 0) {
            $('#TorikeshizumiKeiyakuShadowbord').css('display', 'flex');
        }
        $('body').css('overflow', 'auto');
};

// 請求画面タブ選択
$(function () {
    let tabs = $(".fs-detail_tabs__tab");
    $(".fs-detail_tabs__tab").on("click", function () {
        $(".-current").removeClass("-current");
        $(this).addClass("-current");
        const index = tabs.index(this);
        $(".content").removeClass("show").eq(index).addClass("show");
    })
})

// テーブルのソート
$(function () {

    // 金額に値がなければボタンを非活性にする
    var $tbl = $(".sort-table  .sort-row");
    var $row;
    var $cell;
    for (var i = 0; i < $tbl.length; i++) {
        $row = $tbl[i];
        $cell = $row.cells[2].firstElementChild;
        $btncell = $row.cells[3];
        if ($cell.innerHTML === '') {
            $btncell.firstElementChild.removeAttribute("href");
            $btncell.firstElementChild.firstElementChild.classList.add("fsi--circle_triangle_disabled");
        }
    }

})
// テーブルのソート
$(function () {

    var $tbl = $(".sort-table2  .sort-row2");
    var $row;
    var $cell;
    for (var i = 0; i < $tbl.length; i++) {
        $row = $tbl[i];
        $cell = $row.cells[3].firstElementChild;
        $checkcell = $row.cells[6].firstElementChild;
        $btncell = $row.cells[4];
        // 夜間料金が入っていない場合ボタンを非活性にする
        if ($cell.innerHTML === '') {
           $btncell.firstElementChild.removeAttribute("href");
            $btncell.firstElementChild.firstElementChild.classList.add("fsi--circle_triangle_disabled");
        }
        // 休日フラグがオンの場合背景色を変える
        if ($checkcell.value === 'True') {
            $row.style.backgroundColor = "rgba(255, 128, 128, 0.1)";
        }
    }

})
// 30分値画面タブ選択
$(function () {
    $(".fs-daily_tabs__tab").on("click", function () {
        const group = $(this).parents('.fs-daily_table_area_group');
        group.find('.fs-daily_tabs__tab_current').addClass("fs-daily_tabs__tab_backtab").removeClass('fs-daily_tabs__tab_current');
        $(this).removeClass("fs-daily_tabs__tab_backtab");
        $(this).addClass("fs-daily_tabs__tab_current");
        group.find('.show').removeClass('show');
        const index = $(this).index();
        group.find(".content").eq(index).addClass('show');
    })
})
// 電化でナイトセレクトFAQリンクボタン押下によるポップアップ出力
$(function () {
    $("#FAQLink_DenkaDeNightSelect").on("click", function () {
        $('#FAQforDenkaDeNightSelectShadowbord').css('display', 'flex');
        $('body').css('overflow', 'hidden');
    })
})

//BSC ADD START---------------------------------------------------------
//--------------- エラーチェック対応（開始）----------------------------
// 入力チェック用の正規表現
const regextbl = {
    okyakusamaBango: /^\d{19}$/,
    keiyakuNameKana: /^[a-zA-Zａ-ｚＡ-Ｚ0-9０-９ァ-ーｦ-ﾟ！”＃＄％＆’（）＝～｜‘｛＋＊｝＜＞？＿－＾￥＠「；：」、。・｡｢｣､･\-!-/:-@[-`{-~　 ]*$/,
    yubinBango: /^\d{7}$/,
    kozaBango: /^\d{4}$/,
    labelName: /^[^\x00-\x7Fｧ-ﾝﾞﾟ]{1,60}$/,
    kaiinName: /^[^\x00-\x7Fｧ-ﾝﾞﾟ]{1,60}$/,
    password1: /^[\x21-\x7E]{8,20}$/,
    password2: /^.*[A-Za-z]+.*$/,
    password3: /^.*[0-9]+.*$/,
    password4: /^\*\*\*\*\*\*\*\*$/,
    emailMoji: /^[a-zA-Z0-9@\._\-]+$/,
    emailNg: /^[^@]*@[^@.]*@[^@]*$/,
    emailAt1: /^[^@]+@[^@.]+\.[^@]*[^@.]$/,
    emailAt2: /^[^@]+@.*\.\..*$/,
    emailAt3: /^.{1,256}$/,
    emailAt4: /^\..*$/,
    emailAt5: /^.*\.@.*$/,
    emailAt6: /^.*\.\..*@.*$/,
    tsuchisakiTel: /^\d{11}$/,
    tsuchisakiTel1: /^070\d{8}$/,
    tsuchisakiTel2: /^080\d{8}$/,
    tsuchisakiTel3: /^090\d{8}$/
}

// 入力エラーメッセージ
const msgtbl = {
    ME001401: '通知先区分を選択した際は、通知先を入力してください。',
    ME004901: 'お客さま番号を入力してください。',
    ME004902: 'お客さま番号は19桁の数字で入力してください。',
    ME004903: '郵便番号を入力してください。',
    ME004904: '郵便番号は7桁の半角数字で入力してください。',
    ME004905: '口座番号を入力してください。',
    ME004906: '口座番号は4桁の半角数字で入力してください。',
    ME005101: 'パスワードを入力してください。',
    ME005102: 'パスワードは8桁～20桁の半角英数字の組合せで入力してください。',
    ME005103: '新しいパスワードを入力してください。',
    ME005104: '新しいパスワードは8桁～20桁の半角英数字の組合せで入力してください。',
    ME005105: '新しいパスワード（再入力）を入力してください。',
    ME005106: '新しいパスワード（再入力）はパスワードは8桁～20桁の半角英数字の組合せで入力してください。',
    ME005201: '都道府県を選択してください。',
    ME005202: '市区町村を選択してください。',
    ME005203: '字丁目を選択してください。',
    ME005301: 'アカウント名は全角で入力してください。',
    ME005302: 'ご契約名義を入力してください。',
    ME005303: 'ご契約名義はカナで入力してください。',
    ME005304: '電話番号は11桁の数字で入力してください。',
    ME005305: 'ラベル名は全角で入力してください。',
    ME005501: 'Eメールアドレスを入力してください。',
    ME005300: 'Eメールアドレスが正しくない形式で入力されています。',
    ME005502: 'Eメールアドレスが正しくない形式で入力されています。',
    ME000001: 'Eメールアドレスは半角英数字記号で入力してください。',
    ME000002: 'Eメールアドレスに「ご登録出来ない文字」はご登録いただけません。',
    ME000003: '入力内容に誤りがあります。',
    ME000004: '070,080,090以外で始まる電話番号はご利用できません。'
};

// エラーチェックを遅らせる時間(ms)（遷移時の必須チェック回避対応）
const checkDelayTime = 300;

// エラーメッセージの吹き出し表示（エラー項目、表示位置、メッセージ）
function dispError($id, $posId, $msg) {
    var msgboxId = $id + '_errmsg';
    $('#' + msgboxId).remove();
    $('#' + $posId).after('<div class=fs-item_alert id=' + msgboxId + '><p>' + $msg + '</p></div>');
    $('#' + msgboxId).show();
    $('#' + $id).on('change', function () {
        $('#' + msgboxId).hide();
    });
}

// Email全角→半角変換
function emailZenToHan($str) {
    var val = $str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
    val = val.replace("＠", "@");
    val = val.replace("．", ".");
    val = val.replace("－", "-");
    val = val.replace("＿", "_");
    return val;
}

// フォーカス設定
function setErrorFocus($id) {
    var boxId = '#' + $id;
    $(boxId).focus();
    // エラー項目へのスクロール
    var targetoffset = $(boxId).offset();
    var h = $("html,body");
    if (h.scrollTop() > targetoffset.top - 110) {
        h.animate({ scrollTop: targetoffset.top - 110 }, { queue: false });
    }
}

// ※註：ロストフォーカス時は、遅延実行のためリターンコードは返却されない。
// 登録用Eメールアドレスの入力チェック（ロストフォーカス時）
function checkRegEmail($id) {
    setTimeout(checkRegEmail_ex, checkDelayTime, $id);
}
// 登録用Eメールアドレスの入力チェック（全体チェック時）
function checkRegEmail_ex($id) {
    var val = emailZenToHan(document.getElementById($id).value);
    document.getElementById($id).value = val;
    // 必須チェック
    if (val == "") {
        dispError($id, $id, msgtbl.ME005501);
        return false;
    }

    // Eメール半角英数記号(@._-)チェック
    if (regextbl.emailMoji.test(val) == false) {
        dispError($id, $id, msgtbl.ME000001);
        return false;
    }
    // Eメール使用不可文字チェック(@が複数)
    if (regextbl.emailNg.test(val) == true) {
        dispError($id, $id, msgtbl.ME000002);
        return false;
    }
    // Eメール形式チェック
    if (regextbl.emailAt1.test(val) == false
        || regextbl.emailAt2.test(val) == true
        || regextbl.emailAt3.test(val) == false
        || regextbl.emailAt4.test(val) == true
        || regextbl.emailAt5.test(val) == true
        || regextbl.emailAt6.test(val) == true) {
        dispError($id, $id, msgtbl.ME005502);
        return false;
    }
    return true;
}

// Eメールアドレスの入力チェック（ロストフォーカス時）
function checkEmail($id) {
    setTimeout(checkEmail_ex, checkDelayTime, $id);
}
// Eメールアドレスの入力チェック（全体チェック時）
function checkEmail_ex($id) {
    var val = emailZenToHan(document.getElementById($id).value);
    document.getElementById($id).value = val;
    // 必須チェック
    if (val == "") {
        dispError($id, $id, msgtbl.ME005501);
        return false;
    }
    // Eメール半角英数記号チェック
    if (regextbl.emailMoji.test(val) == false) {
        dispError($id, $id, msgtbl.ME000001);
        return false;
    }
    // Eメール形式チェック
    if (regextbl.emailAt1.test(val) == false
        || regextbl.emailAt2.test(val) == true
        || regextbl.emailAt3.test(val) == false) {
        dispError($id, $id, msgtbl.ME005502);
        return false;
    }
    return true;
}

// Eメールアドレスの形式チェック（ロストフォーカス時）
function checkEmailFormat($id) {
    setTimeout(checkEmailFormat_ex, checkDelayTime, $id);
}
// Eメールアドレスの形式チェック（全体チェック時）
function checkEmailFormat_ex($id) {
    var val = emailZenToHan(document.getElementById($id).value);
    document.getElementById($id).value = val;
    // 必須チェック
    if (val == "") {
        dispError($id, $id, msgtbl.ME005501);
        return false;
    }
    val = emailZenToHan(val);
    // Eメール形式チェック
    if (regextbl.emailAt1.test(val) == false
        || regextbl.emailAt2.test(val) == true
        || regextbl.emailAt3.test(val) == false) {
        dispError($id, $id, msgtbl.ME005502);
        return false;
    }
    return true;
}

// パスワード入力チェック（ロストフォーカス時）
function checkPassword($id) {
    setTimeout(checkPassword_ex, checkDelayTime, $id);
}
// パスワード入力チェック（全体チェック時）
function checkPassword_ex($id) {
    var val = document.getElementById($id).value;
    // 必須チェック
    if (val == "") {
        dispError($id, $id, msgtbl.ME005101);
        return false;
    }
    // パスワード形式チェック
    if ((regextbl.password1.test(val) == false
        || regextbl.password2.test(val) == false
        || regextbl.password3.test(val) == false)
        && regextbl.password4.test(val) == false
    ) {
        dispError($id, $id, msgtbl.ME005102);
        return false;
    }
    return true;
}

// 新しいパスワード入力チェック（ロストフォーカス時）
function checkNewPassword($id) {
    setTimeout(checkNewPassword_ex, checkDelayTime, $id);
}
// 新しいパスワード入力チェック（全体チェック時）
function checkNewPassword_ex($id) {
    var val = document.getElementById($id).value;
    // 必須チェック
    if (val == "") {
        dispError($id, $id, msgtbl.ME005103);
        return false;
    }
    // パスワード形式チェック
    if (regextbl.password1.test(val) == false
        || regextbl.password2.test(val) == false
        || regextbl.password3.test(val) == false) {
        dispError($id, $id, msgtbl.ME005104);
        return false;
    }
    return true;
}

// 新しいパスワード（再入力）入力チェック（ロストフォーカス時）
function checkKakuninYoPasswd($id) {
    setTimeout(checkKakuninYoPasswd_ex, checkDelayTime, $id);
}
// 新しいパスワード（再入力）入力チェック（全体チェック時）
function checkKakuninYoPasswd_ex($id) {
    var val = document.getElementById($id).value;
    // 必須チェック
    if (val == "") {
        dispError($id, $id, msgtbl.ME005105);
        return false;
    }
    // パスワード形式チェック
    if (regextbl.password1.test(val) == false
        || regextbl.password2.test(val) == false
        || regextbl.password3.test(val) == false) {
        dispError($id, $id, msgtbl.ME005106);
        return false;
    }
    return true;
}

// お客様番号入力チェック（ロストフォーカス時）
function checkOkyakusamaBango($id) {
    setTimeout(checkOkyakusamaBango_ex, checkDelayTime, $id);
}
// お客様番号入力チェック（全体チェック時）
function checkOkyakusamaBango_ex($id) {
    var val = document.getElementById($id).value;
    // 必須チェック
    if (val == "") {
        dispError($id, $id, msgtbl.ME004901);
        return false;
    }
    val = val.replace(/-/g, '');
    // お客様番号チェック
    if (regextbl.okyakusamaBango.test(val) == false) {
        dispError($id, $id, msgtbl.ME004902);
        return false;
    }
    return true;
}

// ご契約者名義（カナ）チェック（ロストフォーカス時）
function checkKeiyakuNameKana($id) {
    setTimeout(checkKeiyakuNameKana_ex, checkDelayTime, $id);
}
// ご契約者名義（カナ）チェック（全体チェック時）
function checkKeiyakuNameKana_ex($id) {
    var val = document.getElementById($id).value;
    // 必須チェック
    if (val == "") {
        dispError($id, $id, msgtbl.ME005302);
        return false;
    }
    // ご契約者名義（カナ）チェック
    if (regextbl.keiyakuNameKana.test(val) == false) {
        dispError($id, $id, msgtbl.ME005303);
        return false;
    }
    return true;
}

// 郵便番号チェック
function checkYubinBango($id, $hissu) {
    var val = document.getElementById($id).value;
    val = val.replace(/-/g, '');
    if (val == "") {
        if ($hissu == true) {
            dispError($id, 'grpYubinBango', msgtbl.ME004903);
            return false;
        } else {
            return true;
        }
    }
    if (regextbl.yubinBango.test(val) == false) {
        dispError($id, 'grpYubinBango', msgtbl.ME004904);
        return false;
    }
    return true;
}

// 都道府県チェック（ロストフォーカス時）
function checkTodofuken($id) {
    setTimeout(checkTodofuken_ex, checkDelayTime, $id);
}
// 都道府県チェック（全体チェック時）
function checkTodofuken_ex($id) {
    var val = document.getElementById($id).value;
    if (val == "") {
        dispError($id, 'grpTodofuken', msgtbl.ME005201);
        return false;
    }
    return true;
}

// 市区町村チェック（ロストフォーカス時）
function checkShikugunchoson($id) {
    setTimeout(checkShikugunchoson_ex, checkDelayTime, $id);
}
// 市区町村チェック（全体チェック時）
function checkShikugunchoson_ex($id) {
    var val = document.getElementById($id).value;
    if (val == "") {
        dispError($id, 'grpShikugunchoson', msgtbl.ME005202);
        return false;
    }
    return true;
}

// 字丁目チェック（ロストフォーカス時）
function checkAzachome($id) {
    setTimeout(checkAzachome_ex, checkDelayTime, $id);
}
// 字丁目チェック（全体チェック時）
function checkAzachome_ex($id) {
    var val = document.getElementById($id).value;
    if (val == "") {
        dispError($id, 'grpAzachome', msgtbl.ME005203);
        return false;
    }
    return true;
}

// 口座番号（下4桁）チェック
function checkKozaBango($id, $hissu) {
    var val = document.getElementById($id).value;
    val = val.replace(/-/g, '');
    if (val == "") {
        if ($hissu == true) {
            dispError($id, 'grpKozaBango', msgtbl.ME004905);
            return false;
        } else {
            return true;
        }
    }
    if (regextbl.kozaBango.test(val) == false) {
        dispError($id, 'grpKozaBango', msgtbl.ME004906);
        return false;
    }
    return true;
}

// ラベル名チェック（ロストフォーカス時）
function checkLabelName($id) {
    setTimeout(checkLabelName_ex, checkDelayTime, $id);
}
// ラベル名チェック（全体チェック時）
function checkLabelName_ex($id) {
    var val = document.getElementById($id).value;
    if (val == "") {
        return true;
    }
    if (regextbl.labelName.test(val) == false) {
        dispError($id, $id, msgtbl.ME005305);
        return false;
    }
    return true;
}

// アカウント名チェック（ロストフォーカス時）
function checkKaiinName($id) {
    setTimeout(checkKaiinName_ex, checkDelayTime, $id);
}
// アカウント名チェック（全体チェック時）
function checkKaiinName_ex($id) {
    var val = document.getElementById($id).value;
    if (val == "") {
        dispError($id, $id, msgtbl.ME005301);
        return false;
    }
    if (regextbl.kaiinName.test(val) == false) {
        dispError($id, $id, msgtbl.ME005301);
        return false;
    }
    return true;
}

// 通知先チェック
function checkTsuchisaki($tsuchisakiKbn, $id) {
    if ($tsuchisakiKbn == "") {
        return true;
    }
    var val = document.getElementById($id).value;
    if (val == "") {
        dispError($id, $id, msgtbl.ME001401);
        return false;
    }
    if ($tsuchisakiKbn == "mail") {
        return checkRegEmail($id);
    }
    if (regextbl.tsuchisakiTel.test(val) == false) {
        dispError($id, $id, msgtbl.ME005304);
        return false;
    }
    if (regextbl.tsuchisakiTel1.test(val) == false
        && regextbl.tsuchisakiTel2.test(val) == false
        && regextbl.tsuchisakiTel3.test(val) == false) {
        dispError($id, $id, msgtbl.ME000004);
        return false;
    }
    return true;
}
//--------------- エラーチェック対応（終了）----------------------------

$(function () {
    $('.fs-slider_select_home')
        // 選択肢表示
        .on('click', function () {
            $selectbox = $(this)

            // 重複起動の抑止
            if ($selectbox.hasClass('-changeing')) {
                return false;
            }
            $selectbox.addClass('-changeing')

            // 対象のselectボックスのクローンを作成
            $ul = $selectbox.find('> ul');
            $clone = $ul.clone().wrap('<div class="fs-slider_select_home"></div>')
                .css({
                    width: $ul.outerWidth(),
                    position: 'absolute',
                    'z-index': 1000,
                })

            // 選択の終了処理
            const destroy = function () {
                $selectbox.removeClass('-changeing')
                $clone.off()
                $clone.parent().remove()
                $(window).off('resize.slider_select')
            }

            // bodyの末尾に追加
            $('body').append($clone.parent())
            $clone.offset($ul.offset())
            $clone.addClass('-open')
            $clone.find('input[type=radio]').each(function () {
                this.name = this.name + '_clone'
            })
            $clone.on('click', 'input[type=radio]', function () {
                // 選択結果の反映
                $ul.find('input[type=radio]').attr('checked', false)
                const $radio = $ul.find('input[value="' + this.value + '"]');
                $radio.prop('checked', true).attr('checked', true)
                $radio.trigger('change')
                if (!$ul.hasClass('-reset')) {
                    setSelectedClass($ul, $radio);
                    // 2021.02.15 イベント発火の邪魔になるので削除
                    // } else {
                    //   $radio.prop('checked', false)
                }

                destroy()
            })
                .on('click', '.fs-slider_select__close_backstage', destroy)
                .on('change', 'input.fs-slider_select__expand', destroy)

            const $radios = $clone.find('input[type=radio]');
            $radios.on('keydown', function (e) {
                const $checked = $radios.filter(':checked');
                const idx = $radios.index($checked);

                if (e.keyCode == 38) {
                    // 上キー
                    if (idx > 0) {
                        $radios.filter(':eq(' + (idx - 1) + ')').prop('checked', true);
                    }
                } else if (e.keyCode == 40) {
                    // 下キー
                    const $next = $radios.filter(':eq(' + (idx + 1) + ')');
                    if ($next.length) {
                        $next.prop('checked', true);
                    }
                } else if (e.keyCode == 13) {
                    // Enterキー
                    $checked.trigger('click');
                } else if (e.keyCode == 27) {
                    // ESCキー
                    destroy();
                }

                return false;
            })
            // 初期選択
            if ($radios.filter(':checked').length == 1) {
                $radios.filter(':checked').focus()
            } else {
                $radios.filter(':eq(0)').focus()
            }

            $(window).on('resize.slider_select', function () {
                // リサイズ対応
                $clone.offset($ul.offset())
                    .css({ width: $ul.outerWidth() })
            })

            return false;
        }).on('change', function () {
            const $select = $(this);
            const $cehcked = $select.find('input[type=radio]:checked')

            if (!$select.hasClass('-reset')) {
                setSelectedClass($select, $cehcked)
            }
        }).on('keydown', function (e) {
            // Enterキー、下キー
            if (e.keyCode == 13 || e.keyCode == 40) {
                $(this).trigger('click');
                return false;
            }
        })
        .each(function () {
            const $select = $(this);
            const size = $select.find('.fs-slider_select__option').length;
            if (size <= 1) {
                $select.addClass('-one').off()
            }
            setSelectedClass($select, $select.find('input[type=radio]:checked'));
        })
});


//.NetのAjax機能でのポストバック対応
function pageLoad() {
    canProcRun = true;

    //インプットタグ内でEnterキーを抑止
    $(function () {
        $("input").keydown(function (e) {
            if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
                return false;
            } else {
                return true;
            }
        });
    });

    // HTMLインジェクション対策
    $(function () {
        //入力未確定状態
        let compositionState = false;

        $('.fsj-validation').on('compositionstart', function (e) {

            compositionState = true;
        });

        $('.fsj-validation').on('compositionend', function (e) {

            trim_validation_strings(e);
            compositionState = false;
        });


        $('.fsj-validation').on('input', function (e) {

            //入力未確定状態の場合は処理スキップ
            if (compositionState) {
                return;
            };

            trim_validation_strings(e);
        });

        const trim_validation_strings = function (e) {
            let trimValue = e.currentTarget.value;
            const pos = e.currentTarget.selectionStart;
            let trimLength = 0;

            if (trimValue.indexOf('<') != -1) {
                const tempValue = trimValue.replace(/</g, '');
                trimLength += trimValue.length - tempValue.length;
                trimValue = tempValue;
            }

            if (trimValue.indexOf('>') != -1) {
                const tempValue = trimValue.replace(/>/g, '');
                trimLength += trimValue.length - tempValue.length;
                trimValue = tempValue;
            }

            //&&##対応のため再帰的に実施
            while (trimValue.indexOf('&#') != -1) {
                const tempValue = trimValue.replace(/&#/g, '');
                trimLength += trimValue.length - tempValue.length;
                trimValue = tempValue;
            }

            if (trimLength > 0) {
                e.currentTarget.value = trimValue;
                e.currentTarget.setSelectionRange(pos - trimLength, pos - trimLength);

            }
        };
    });

    // input_number
    $(function () {
        // お客さま番号の書式設定
        $('.fsj-number_format')   .on('keydown', function (e) {
            keyCode = e.keyCode;
            this.cfsKeyCode = e.code;
        });
    });

    $(function () {
        // お客さま番号のIMEモード開始
        $('.fsj-number_format').on('compositionstart', function (e) {
            this.cfsCompositionState = true;
        });
    });

    $(function () {
        // お客さま番号のIMEモード終了
        $('.fsj-number_format').on('compositionend', function (e) {
            this.cfsCompositionState = false;

            // エンターキーで確定した場合
            if (this.cfsKeyCode == 'Enter') {
                // changeイベントを発火
                $(this).trigger('change');
            }
        });
    });

    $(function () {
        // お客さま番号の書式設定
        $('.fsj-number_format').on('input change', function (e) {

            // IMEモード中はイベントを無視する
            if (this.cfsCompositionState) {
                return;
            }

            var pos = this.selectionStart;  //カーソルの現在地
            let num = this.value.replace(/-/g, '');
            //BSC ADD START---------------------------------------------------------
            // 全角数字を半角数字に変換
            num = num.replace(/０/g, '0');
            num = num.replace(/１/g, '1');
            num = num.replace(/２/g, '2');
            num = num.replace(/３/g, '3');
            num = num.replace(/４/g, '4');
            num = num.replace(/５/g, '5');
            num = num.replace(/６/g, '6');
            num = num.replace(/７/g, '7');
            num = num.replace(/８/g, '8');
            num = num.replace(/９/g, '9');
            //BSC ADD END-----------------------------------------------------------
            const len = num.length;

            if (len > 17) num = num.replace(/(.{17})/, "$1-");
            if (len > 10) num = num.replace(/(.{10})/, "$1-");
            if (len > 8) num = num.replace(/(.{8})/, "$1-");
            if (len > 5) num = num.replace(/(.{5})/, "$1-");
            if (len > 2) num = num.replace(/(.{2})/, "$1-");
            // 書式設定後のお客さま番号が、最大長を超えないようにする
            this.value = num.substring(0, Math.min(num.length, this.maxLength));

            if (keyCode == "" || keyCode == null || keyCode == void 0) {
                //何もしない（一番最後にカーソルがいく）

            } else if (keyCode == KEY_CODE_BACKSPACE) {
                // BackSpaceを押下したとき
                this.setSelectionRange(pos, pos);

            } else if (keyCode == KEY_CODE_DELETE) {
                // Deleteを押下したとき
                if (pos == 2 || pos == 6 || pos == 10 || pos == 13 || pos == 21) {
                    this.setSelectionRange(pos + 1, pos + 1);
                } else {
                    this.setSelectionRange(pos, pos);
                }

            } else {

                if (pos == 3 || pos == 7 || pos == 11 || pos == 14 || pos == 22) {
                    this.setSelectionRange(pos + 1, pos + 1);
                } else {
                    this.setSelectionRange(pos, pos);
                }
            }

            keyCode = "";
            this.cfsKeyCode = "";
        });
    });


    $(function () {
        // 郵便番号番号の書式設定
        $('.fsj-post_number_format').on('keydown', function (e) {
            keyCode = e.keyCode;
            this.cfsKeyCode = e.code;
        });
    });

    $(function () {
        // 郵便番号のIMEモード開始
        $('.fsj-post_number_format').on('compositionstart', function (e) {
            this.cfsCompositionState = true;
        });
    });

    $(function () {
        // 郵便番号のIMEモード終了
        $('.fsj-post_number_format').on('compositionend', function (e) {
            this.cfsCompositionState = false;

            // エンターキーで確定した場合
            if (this.cfsKeyCode == 'Enter') {
                // changeイベントを発火
                $(this).trigger('change');
            }
        });
    });

    $(function () {
        // 郵便番号番号の書式設定
        $('.fsj-post_number_format').on('input change', function (e) {

            // IMEモード中はイベントを無視する
            if (this.cfsCompositionState) {
                return;
            }

            var pos = this.selectionStart;  //カーソルの現在地
            let num = this.value.replace(/-/g, '');
            // 全角数字を半角数字に変換
            num = num.replace(/０/g, '0');
            num = num.replace(/１/g, '1');
            num = num.replace(/２/g, '2');
            num = num.replace(/３/g, '3');
            num = num.replace(/４/g, '4');
            num = num.replace(/５/g, '5');
            num = num.replace(/６/g, '6');
            num = num.replace(/７/g, '7');
            num = num.replace(/８/g, '8');
            num = num.replace(/９/g, '9');
            const len = num.length;

            if (len > 3) num = num.replace(/(.{3})/, "$1-");
            // 書式設定後の郵便番号が、最大長を超えないようにする
            this.value = num.substring(0, Math.min(num.length, this.maxLength));

            if (keyCode == "" || keyCode == null || keyCode == void 0) {
                //何もしない（一番最後にカーソルがいく）

            } else if (keyCode == KEY_CODE_BACKSPACE) {
                // BackSpaceを押下したとき
                this.setSelectionRange(pos, pos);

            } else if (keyCode == KEY_CODE_DELETE) {
                // Deleteを押下したとき
                if (pos == 3) {
                    this.setSelectionRange(pos + 1, pos + 1);
                } else {
                    this.setSelectionRange(pos, pos);
                }

            } else {

                if (pos == 4) {
                    this.setSelectionRange(pos + 1, pos + 1);
                } else {
                    this.setSelectionRange(pos, pos);
                }
            }

            keyCode = "";
            this.cfsKeyCode = "";
        });
    });

    const enable_submit_ajax = function () {
        if ($('button.fs-submit').length !== 1) return true;

        // "fsj-submit_required"クラスを持つ項目すべてが入力されたら活性
        const $items = $('.fsj-submit_required');
        if ($items.length == 0) return false;

        disable = $items.filter(function () {
            $elm = $(this);
            if ($elm.prop('type') == 'checkbox') {
                return !$elm.prop('checked');
            } else {
                return $elm.val() == "";
            }
        }).length > 0;

        $('button.fs-submit').toggleClass('-disabled', disable).prop('disabled', disable)
    }

    //BSC ADD START---------------------------------------------------------
    $(function () {
        // サブミットボタンの活性制御
        //BSC ADD END-----------------------------------------------------------  
        $('.fsj-submit_required').on('change input', enable_submit_ajax);
        enable_submit_ajax();
    });


};
//BSC ADD END-----------------------------------------------------------