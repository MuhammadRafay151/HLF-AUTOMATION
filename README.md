# HLF-AUTOMATION

This is an Automation Tool used to generate configuration yaml script of Hyperledger Fabric network, developed using Node.js cross-app desktop framework Electron.js.


## Current Features

### Organization.yaml file generation:

Allow generation of org.yaml file which are used to register different organization in the block chain.

### (Channel Configuation) configtx.yaml file generation:

Allow generation (Channel Configuation) configtx.yaml file which is required to build the channel configuration.

### Docker container file generation:

* Allow to generate docker-compose-ca.yaml which contain CA(Certifacte Authority) Server of the organization.
* Allow to generate docker-compose-couch.yaml which contain couchdb container mapped with the peers of the organizations.
* Allow to generate docker-compose-test-net.yaml which contain network configuration of each organization in a blockchain.

## Getting started

Dependencies:
- Electron.js 12.0.0
- Bootstrap 4.3.1
- js-yaml 4.0.0
- js-zip 3.6.0
- FileSaver.js 2.0.0

### 1. Install dependencies using the following command:

```bash
npm i
```

### 2. Run development server
```bash
npm start
```
## Support

* If you are having issues or have any suggestion, please let me know.<gr>

## License
MIT License

Copyright (c) 2021 Certifis.
