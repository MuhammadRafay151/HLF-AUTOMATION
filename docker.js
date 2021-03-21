function create_docker_compose_ca(){

    var OrgTable=document.querySelector("#OrgTable tbody")
    console.log(OrgTable)

    var orgname= OrgTable.rows[0].cells[0].children[0].value;
    var port= OrgTable.rows[0].cells[6].children[0].valueAsNumber;

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

   let yamlStr = jsyaml.safeDump(docker_compose_ca)
    const newlink = document.createElement("a");

    newlink.href = URL.createObjectURL(new Blob([yamlStr], {
        type: "text/yaml"
    }));

    newlink.setAttribute("download", `docker-compose-ca.yaml`);

    newlink.click();
  
  }

function docker_compose_couch(){

    var docker_compose_couch={
        "version": "2",
        "networks": {
           "test": {
              "name": "first-network"
           }
        },
        "services": {}
     }

     for (let i = 0; i < 1; i++) {
        
         var tempo={
            "couchdb4": {
                "container_name": "couchdb4",
                "image": "couchdb:3.1",
                "environment": [
                   "COUCHDB_USER=admin",
                   "COUCHDB_PASSWORD=adminpw"
                ],
                "ports": [
                   "9984:5984"
                ],
                "networks": [
                   "test"
                ]
             },
         }
     }

     for (let i = 0; i < 1; i++) {
        
        var temp1={
            "peer0.ku.com": {
                "environment": [
                   "CORE_LEDGER_STATE_STATEDATABASE=CouchDB",
                   "CORE_LEDGER_STATE_COUCHDBCONFIG_COUCHDBADDRESS=couchdb4:5984",
                   "CORE_LEDGER_STATE_COUCHDBCONFIG_USERNAME=admin",
                   "CORE_LEDGER_STATE_COUCHDBCONFIG_PASSWORD=adminpw"
                ],
                "depends_on": [
                   "couchdb4"
                ]
             },
        }
    }

    docker_compose_couch.services=push(tempo)
    docker_compose_couch.services=Object.assign(temp1)

    console.log(docker_compose_couch.services)

    
   let yamlStr = jsyaml.safeDump(docker_compose_couch)
   const newlink = document.createElement("a");

   newlink.href = URL.createObjectURL(new Blob([yamlStr], {
       type: "text/yaml"
   }));

   newlink.setAttribute("download", `docker_compose_couch.yaml`);

   newlink.click();


}