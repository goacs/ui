import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    rtl: false,
    theme: {
        dark: false,
        themes: {
            dark: {
                primary: '#64b5f6',
                accent: '#50708E',
                secondary: '#1565c0',
            },
            light: {
                primary: '#64b5f6',
                accent: '#5381AD',
                secondary: '#1565c0',

            }
        }
    }
});
