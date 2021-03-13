import semver from 'semver';
import connector from './traccarConnector.js';

    /**
     * Install plugin
     * @param app
     * @param axios
     */


    function traccar(app,server) {



        if (traccar.installed) {
            return;
        }

        if (!server) {
            console.error('SERVER is required');
            return;
        }

        traccar.installed = true;


        let traccarConnector = new connector(server,app);

        if (semver.lt(app.version, '3.0.0')) {
            Object.defineProperties(app.prototype, {

                traccar: {
                    get: function get() {
                        return traccarConnector;
                    }
                },

                $traccar: {
                    get: function get() {
                        return traccarConnector;
                    }
                }

            });
        } else {
            app.config.globalProperties.traccar = traccarConnector;
            app.config.globalProperties.$traccar = traccarConnector;
        }

        app.traccar = traccarConnector;
        app.$traccar = traccarConnector;
    }


    export default traccar;
