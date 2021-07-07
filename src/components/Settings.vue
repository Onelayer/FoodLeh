<template>
    <div class="settings">
        <p> Edit your stall settings here! </p>
        <div class="settingsInputs">
            <h6>Set Stall Name</h6>
            <input v-model="stallName"/>
            <br />
            <br />
            <h6>Set Mobile Number</h6>
            <input v-model="hpNumber"/>
        </div>
        <div class="navspacing">
            <button @click.prevent="saveSettings">Save Settings</button>    
        </div>
    </div>    
</template>

<script>
import ObtainStallSettings from '../services/ObtainStallSettings'

export default {
    data() {
        return {
            stallName: '',
            hpNumber: '',
            submitted: false,
        }
    },
    methods: {
        saveSettings() {

            let data = {
                StallName: this.stallName,
                MobileNumber: this.hpNumber,
            }

            ObtainStallSettings.update(data)
                .then(() => {
                console.log("Settings Updated Successfully");
                this.submitted = true;
            })
                .catch((e) => {
                console.log(e);
            });

        },
        onDataChange(snapshot) {
            // this.stallName = items.val().stallName;
            // this.hpNumber = items.val().hpNumber;
            const dataSettingsDB = snapshot.val();
            
            let stallnamedb = dataSettingsDB.StallName;
            let mobilenumberdb = dataSettingsDB.MobileNumber;
            
            this.stallName = stallnamedb;
            this.hpNumber = mobilenumberdb;

        },

    },
    mounted() {
        ObtainStallSettings.getAllForStore().on("value", this.onDataChange);
    },
}

</script>

<style scoped>
.settings {
    text-align: center;
}
</style>
