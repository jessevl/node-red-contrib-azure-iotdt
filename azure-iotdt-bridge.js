module.exports = function(RED) {
    const handleMessage = require('./lib/engine');

    function AzureIotDTBridgeNode(config) {
        RED.nodes.createNode(this,config);
        this.DigitalTwinApiUrl = config.DigitalTwinApiUrl;
        this.clientId = config.clientId;
        this.clientSecret = config.clientSecret;
        this.authorityHostUrl = config.authorityHostUrl;

        var node = this;

        node.on('input', function(msg) {
            const parameters = {
                clientId: node.clientId,
                clientSecret: node.clientSecret,
                authorityHostUrl: node.authorityHostUrl,
                digitalTwinAPIUrl: node.DigitalTwinApiUrl
            };

            try {
                handleMessage({ ...parameters}, msg.payload.device, msg.payload.measurements, msg.payload.timestamp);
            } catch (e) {
                node.send('[ERROR]', e.message);
            };
            
        });
    }
    RED.nodes.registerType("azure-iotdt-bridge",AzureIotDTBridgeNode);
}