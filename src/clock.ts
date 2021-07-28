// Import events module
import SerialConnector from 'app/serialConnector';
import { EventsConnector } from 'app/glogalEvents/eventCollector';
import { Actions } from 'app/actions';

class Clock extends EventsConnector {

    private serial: SerialConnector;

    constructor(serial: SerialConnector) {
        super();
        this.serial = serial;
    }

    public async tick(): Promise<void> {
        //ACTION_SYNC_LOCONET_INPUT
        this.serial.readBuffer().forEach((message) => {
            this.getContainer().emit(Actions.Serial.MESSAGE_RECEIVE, message);
        });




        // TODO CLOCKID;

        // ACTION_SYNC_LOCONET_INPUT;
        // check for input signals

        // ACTION_SYNC_USER_INPUT;
        // check form user inputs


        // preprocess sectors
        // preprocess turnousts
        // preprocess signals

        // create new locks

        // ACTION_SYNC_ROUTES
        // check existing lock (routes) + destroy
        // ACTION_SYNC_BUILDING;
        // check routes that are building
        // ACTION_BUILD_ROUTES
        // try build new routes


        await this.serial.writeBuffer()
        // ACTION_SYNC_LOCONET_OUTPUT;
        // send requests to loconet
        // ACTION_SYNC_USER_OUTPUT;
        return this.tick();
    }
}
