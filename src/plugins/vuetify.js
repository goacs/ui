import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    rtl: false,
    theme: {
        dark: false,
        themes: {
            dark: {
                primary: '#1AA6C3',
                accent: '#50708E',
                secondary: '#798EEA',
                success: '#4CAF50',
                info: '#2196F3',
                warning: '#FB8C00',
                error: '#FF5252'
            },
            light: {
                primary: '#499BEA',
                accent: '#5381AD',
                secondary: '#798EEA',
                success: '#4CAF50',
                info: '#AC34FF',
                warning: '#FB8C00',
                error: '#FF5252'
            }
        }
    }
});
