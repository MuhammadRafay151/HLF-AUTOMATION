function create_docker_compose_ca(){

    var OrgTable=document.querySelector("#OrgTable tbody")
    console.log(OrgTable)

    var orgname= OrgTable.rows[0].cells[0].children[0].value;
    var port= OrgTable.rows[0].cells[3].children[0].valueAsNumber;

    var contname="ca_"+orgname;

    var docker_compose_ca={
      "version": "2",
      "networks": {
         "test": null
      },
      "services": {
        contname: {
            "image": "hyperledger/fabric-ca:$IMAGE_TAG",
            "environment": [
               "FABRIC_CA_HOME=/etc/hyperledger/fabric-ca-server",
               `FABRIC_CA_SERVER_CA_NAME=ca-${orgname}`,
               "FABRIC_CA_SERVER_TLS_ENABLED=true",
               `FABRIC_CA_SERVER_PORT=${port}`
            ],
            "ports": [
               `${port}:${port}`
            ],
            "command": "sh -c 'fabric-ca-server start -b admin:adminpw -d'",
            "volumes": [
               `../organizations/fabric-ca/${orgname}:/etc/hyperledger/fabric-ca-server`
            ],
            "container_name": contname,
            "networks": [
               "test"
            ]
         }
      }
   }

   let yamlStr = jsyaml.dump(docker_compose_ca,{"lineWidth":"1000"})
    const newlink = document.createElement("a");

    newlink.href = URL.createObjectURL(new Blob([yamlStr], {
        type: "text/yaml"
    }));

    newlink.setAttribute("download", `docker-compose-ca.yaml`);

    newlink.click();

    docker_compose_couch()
    docker_compose_test_net()
  
  }

function docker_compose_couch(){

   var OrgTable=document.querySelector("#OrgTable tbody")
   var PeerTable=document.querySelector("#PeerTable tbody")

   var totalpeers= OrgTable.rows[0].cells[2].children[0].valueAsNumber;

   
    var docker_compose_couch={
        "version": "2",
        "networks": {
           "test": {
              "name": "first-network"
           }
        },
        "services": []
     }

     var services_data ={}

     console.log(PeerTable)

     for (let i = 0; i < totalpeers; i++) {

         var couchdb= PeerTable.rows[i].cells[1].children[0].value;
         var peerdomain= PeerTable.rows[i].cells[0].children[0].value;
         var couchdbport= PeerTable.rows[i].cells[2].children[0].valueAsNumber;

         services_data[couchdb]={
            "container_name": couchdb,
            "image": "couchdb:3.1",
            "environment": [
               "COUCHDB_USER=admin",
               "COUCHDB_PASSWORD=adminpw"
            ],
            "ports": [
               `${couchdbport}:5984`
            ],
            "networks": [
               "test"
            ]
         }
         
         services_data[peerdomain]= {
            "environment": [
               "CORE_LEDGER_STATE_STATEDATABASE=CouchDB",
               `CORE_LEDGER_STATE_COUCHDBCONFIG_COUCHDBADDRESS=${couchdb}:5984`,
               "CORE_LEDGER_STATE_COUCHDBCONFIG_USERNAME=admin",
               "CORE_LEDGER_STATE_COUCHDBCONFIG_PASSWORD=adminpw"
            ],
            "depends_on": [
               couchdb
            ]
         }

     }
      

    docker_compose_couch["services"]=services_data;

    
   let yamlStr = jsyaml.dump(docker_compose_couch,{"lineWidth":"1000"})
   const newlink = document.createElement("a");

   newlink.href = URL.createObjectURL(new Blob([yamlStr], {
       type: "text/yaml"
   }));

   newlink.setAttribute("download", `docker-compose-couch.yaml`);

   newlink.click();


}

function docker_compose_test_net(){

   var OrgTable=document.querySelector("#OrgTable tbody")
   var PeerTable=document.querySelector("#PeerTable tbody")

   var totalpeers= OrgTable.rows[0].cells[2].children[0].valueAsNumber;

   var docker_compose_test_net={
      "version": "2",
      "networks": {
        "test": {
          "name": "first-network"
        }
      }
      
    }


   var peer_services={};
   var volumes={}
   for (let i = 0; i < totalpeers; i++) {

      var orgname= OrgTable.rows[0].cells[0].children[0].value;
      var orgdomain= OrgTable.rows[0].cells[1].children[0].value;
      var peerdomain= PeerTable.rows[i].cells[0].children[0].value;
      var peerport= PeerTable.rows[i].cells[3].children[0].valueAsNumber;
      var blockchainport= PeerTable.rows[i].cells[4].children[0].valueAsNumber;

     

      volumes[peerdomain]=null
      
      peer_services[peerdomain]={
         "container_name": peerdomain,
         "image": "hyperledger/fabric-peer:$IMAGE_TAG",
         "environment": [
           "CORE_VM_ENDPOINT=unix:///host/var/run/docker.sock",
           "CORE_VM_DOCKER_HOSTCONFIG_NETWORKMODE=first-network",
           "FABRIC_LOGGING_SPEC=INFO",
           "CORE_PEER_TLS_ENABLED=true",
           "CORE_PEER_PROFILE_ENABLED=true",
           "CORE_PEER_TLS_CERT_FILE=/etc/hyperledger/fabric/tls/server.crt",
           "CORE_PEER_TLS_KEY_FILE=/etc/hyperledger/fabric/tls/server.key",
           "CORE_PEER_TLS_ROOTCERT_FILE=/etc/hyperledger/fabric/tls/ca.crt",
           `CORE_PEER_ID=${peerdomain}`,
           `CORE_PEER_ADDRESS=${peerdomain}:${peerport}`,
           `CORE_PEER_LISTENADDRESS=0.0.0.0:${peerport}`,
           `CORE_PEER_CHAINCODEADDRESS=${peerdomain}:${blockchainport}`,
           `CORE_PEER_CHAINCODELISTENADDRESS=0.0.0.0:${blockchainport}`,
           `CORE_PEER_GOSSIP_BOOTSTRAP=${peerdomain}:${peerport}`,
           `CORE_PEER_GOSSIP_EXTERNALENDPOINT=${peerdomain}:${peerport}`,
           `CORE_PEER_LOCALMSPID=${orgname}MSP`
         ],
         "volumes": [
           "/var/run/:/host/var/run/",
           `../organizations/peerOrganizations/${orgdomain}/peers/${peerdomain}/msp:/etc/hyperledger/fabric/msp`,
           `../organizations/peerOrganizations/${orgdomain}/peers/${peerdomain}/tls:/etc/hyperledger/fabric/tls`,
           `${peerdomain}:/var/hyperledger/production`
         ],
         "working_dir": "/opt/gopath/src/github.com/hyperledger/fabric/peer",
         "command": "peer node start",
         "ports": [
           `${peerport}:${peerport}`
         ],
         "networks": [
           "test"
         ]
       }


   }
   
   docker_compose_test_net["volumes"]=volumes;
   docker_compose_test_net["services"]=peer_services;

   let yamlStr = jsyaml.dump(docker_compose_test_net,{"lineWidth":"1000"})
   const newlink = document.createElement("a");

   newlink.href = URL.createObjectURL(new Blob([yamlStr], {
       type: "text/yaml"
   }));

   newlink.setAttribute("download", `docker-compose-test-net.yaml`);

   newlink.click();


}