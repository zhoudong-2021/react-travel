import { Middleware } from 'redux';
import i18n from "../../i18n/configs";
import { CHANGE_LANGUAGE } from '../language/languageActions';

export const translateText: Middleware = (store) => (next) => (action) => {
    if (action.type === CHANGE_LANGUAGE)
        i18n.changeLanguage(action.payload);
    next(action);
}