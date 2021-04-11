function createOrgYaml(){

    var orglist=[]
    var peerorg=[]
    var total_org=document.querySelector("#PeerTable tbody").rows.length
    var table=document.querySelector("#PeerTable tbody")

    for (var i = 0; i < total_org; i++) {

        var orgname= table.rows[i].cells[0].children[0].value;
        var orgdomain=table.rows[i].cells[1].children[0].value;
        var enablenodeofus=Boolean(table.rows[i].cells[2].children[0].valueAsNumber);
        var totalpeers=table.rows[i].cells[3].children[0].valueAsNumber;
        var sans=table.rows[i].cells[4].children[0].value;
        var totalusers=table.rows[i].cells[5].children[0].valueAsNumber;
        var port=table.rows[i].cells[6].children[0].valueAsNumber;

        orglist.push({
            "PeerOrgs":
            {
                "Name": orgname,
                "Domain": orgdomain,
                "EnableNodeOUs": enablenodeofus,
                "Template":
                {
                    "Count": totalpeers,
                    "SANS":  [sans]
                },
                "Users":
                {
                    "Count": totalusers
                }
            }

        })
        orgmsp=orgname+"MSP"
        peerorg.push(
          {
            "Name": orgmsp,
            "ID": orgmsp,
            "MSPDir": `../organizations/peerOrganizations/${orgdomain}/msp`,
            "Policies": {
              "Readers": {
                "Type": "Signature",
                "Rule": `OR(${orgmsp}.admin, ${orgmsp}.peer, ${orgmsp}.client)`
              },
              "Writers": {
                "Type": "Signature",
                "Rule": `OR(${orgmsp}.admin, ${orgmsp}.client)`
              },
              "Admins": {
                "Type": "Signature",
                "Rule": `OR('${orgmsp}.admin')`
              },
              "Endorsement": {
                "Type": "Signature",
                "Rule": `OR('${orgmsp}.peer')`
              }
            },
            "AnchorPeers": [
              {
                "Host": "peer0."+orgdomain,
                "Port": port
              }
            ]
          }

        )

    }

    for (var i = 0; i < total_org; i++) {

        let yamlStr = jsyaml.dump(orglist[i])
        const newlink = document.createElement("a");

        newlink.href = URL.createObjectURL(new Blob([yamlStr], {
            type: "text/yaml"
        }));

        newlink.setAttribute("download", `${orglist[i].PeerOrgs.Name}.yaml`);

        newlink.click();
        
    }
    console.log(peerorg)

    createConfigtx(peerorg)

}

function createConfigtx(peerorg){

  var total_Orderer=document.querySelector("#OrdererTable tbody").rows.length
  var OrdererTable=document.querySelector("#OrdererTable tbody")



    var orderer={

            "Name": "OrdererOrg",
            "ID": "OrdererMSP",
            "MSPDir": "../organizations/ordererOrganizations/example.com/msp",
            "Policies": {
              "Readers": {
                "Type": "Signature",
                "Rule": "OR('OrdererMSP.member')"
              },
              "Writers": {
                "Type": "Signature",
                "Rule": "OR('OrdererMSP.member')"
              },
              "Admins": {
                "Type": "Signature",
                "Rule": "OR('OrdererMSP.admin')"
              }
            },
            "OrdererEndpoints": [
            ]
    }
   
    for (let i = 0; i < total_Orderer; i++) {

      var ordererdomain= OrdererTable.rows[i].cells[0].children[0].value;
      var port=OrdererTable.rows[i].cells[1].children[0].valueAsNumber;
        
        orderer.OrdererEndpoints.push(ordererdomain+":"+port)
    }
    
    console.log(orderer.OrdererEndpoints)
   
    

    var configtx={
      "Organizations": [
      ],
      "Capabilities": {
        "Channel": {
          "V2_0": true
        },
        "Orderer": {
          "V2_0": true
        },
        "Application": {
          "V2_0": true
        }
      },
      "Application": {
        "Organizations": null,
        "Policies": {
          "Readers": {
            "Type": "ImplicitMeta",
            "Rule": "ANY Readers"
          },
          "Writers": {
            "Type": "ImplicitMeta",
            "Rule": "ANY Writers"
          },
          "Admins": {
            "Type": "ImplicitMeta",
            "Rule": "MAJORITY Admins"
          },
          "LifecycleEndorsement": {
            "Type": "ImplicitMeta",
            "Rule": "MAJORITY Endorsement"
          },
          "Endorsement": {
            "Type": "ImplicitMeta",
            "Rule": "MAJORITY Endorsement"
          }
        },
        "Capabilities": {
          "V2_0": true
        }
      },
      "Orderer": {
        "OrdererType": "etcdraft",
        "EtcdRaft": {
          "Consenters": []
        },
        "Addresses": [],
        "BatchTimeout": "2s",
        "BatchSize": {
          "MaxMessageCount": 10,
          "AbsoluteMaxBytes": "99 MB",
          "PreferredMaxBytes": "512 KB"
        },
        "Organizations": null,
        "Policies": {
          "Readers": {
            "Type": "ImplicitMeta",
            "Rule": "ANY Readers"
          },
          "Writers": {
            "Type": "ImplicitMeta",
            "Rule": "ANY Writers"
          },
          "Admins": {
            "Type": "ImplicitMeta",
            "Rule": "MAJORITY Admins"
          },
          "BlockValidation": {
            "Type": "ImplicitMeta",
            "Rule": "ANY Writers"
          }
        }
      },
      "Channel": {
        "Policies": {
          "Readers": {
            "Type": "ImplicitMeta",
            "Rule": "ANY Readers"
          },
          "Writers": {
            "Type": "ImplicitMeta",
            "Rule": "ANY Writers"
          },
          "Admins": {
            "Type": "ImplicitMeta",
            "Rule": "MAJORITY Admins"
          }
        },
        "Capabilities": {
          "V2_0": true
        }
      },
      "Profiles": {
        "TwoOrgsOrdererGenesis": {
          "Policies": {
            "Readers": {
              "Type": "ImplicitMeta",
              "Rule": "ANY Readers"
            },
            "Writers": {
              "Type": "ImplicitMeta",
              "Rule": "ANY Writers"
            },
            "Admins": {
              "Type": "ImplicitMeta",
              "Rule": "MAJORITY Admins"
            }
          },
          "Capabilities": {
            "V2_0": true
          },
          "Orderer": {
            "OrdererType": "etcdraft",
            "EtcdRaft": {
              "Consenters": []
            },
            "Addresses": [],
            "BatchTimeout": "2s",
            "BatchSize": {
              "MaxMessageCount": 10,
              "AbsoluteMaxBytes": "99 MB",
              "PreferredMaxBytes": "512 KB"
            },
            "Organizations": [],
            "Policies": {
              "Readers": {
                "Type": "ImplicitMeta",
                "Rule": "ANY Readers"
              },
              "Writers": {
                "Type": "ImplicitMeta",
                "Rule": "ANY Writers"
              },
              "Admins": {
                "Type": "ImplicitMeta",
                "Rule": "MAJORITY Admins"
              },
              "BlockValidation": {
                "Type": "ImplicitMeta",
                "Rule": "ANY Writers"
              }
            },
            "Capabilities": {
              "V2_0": true
            }
          },
          "Consortiums": {
            "SampleConsortium": {
              "Organizations": [ ]
            }
          }
        },
        "TwoOrgsChannel": {
          "Consortium": "SampleConsortium",
          "Policies": {
            "Readers": {
              "Type": "ImplicitMeta",
              "Rule": "ANY Readers"
            },
            "Writers": {
              "Type": "ImplicitMeta",
              "Rule": "ANY Writers"
            },
            "Admins": {
              "Type": "ImplicitMeta",
              "Rule": "MAJORITY Admins"
            }
          },
          "Capabilities": {
            "V2_0": true
          },
          "Application": {
            "Organizations": [],
            "Policies": {
              "Readers": {
                "Type": "ImplicitMeta",
                "Rule": "ANY Readers"
              },
              "Writers": {
                "Type": "ImplicitMeta",
                "Rule": "ANY Writers"
              },
              "Admins": {
                "Type": "ImplicitMeta",
                "Rule": "MAJORITY Admins"
              },
              "LifecycleEndorsement": {
                "Type": "ImplicitMeta",
                "Rule": "MAJORITY Endorsement"
              },
              "Endorsement": {
                "Type": "ImplicitMeta",
                "Rule": "MAJORITY Endorsement"
              }
            },
            "Capabilities": {
              "V2_0": true
            }
          }
        }
      }
    }

    configtx.Organizations.push(orderer)
    configtx.Organizations.push(peerorg)


    var Consenters=[]
    var Addresses=[]
    for (let i = 0; i < total_Orderer; i++) {

      var ordererdomain= OrdererTable.rows[i].cells[0].children[0].value;
      var port=OrdererTable.rows[i].cells[1].children[0].valueAsNumber;

      Consenters.push({

        "Host": ordererdomain,
        "Port": port,
        "ClientTLSCert": `../organizations/ordererOrganizations/example.com/orderers/${ordererdomain}/tls/server.crt`,
        "ServerTLSCert": `../organizations/ordererOrganizations/example.com/orderers/${ordererdomain}/tls/server.crt`

      })

      Addresses.push(ordererdomain+":"+port)
      
    }
    console.log(Consenters)
    console.log(Addresses)

    configtx.Orderer.EtcdRaft.Consenters.push(Consenters)
    configtx.Orderer.Addresses.push(Addresses)
    
    configtx.Profiles.TwoOrgsOrdererGenesis.Orderer.EtcdRaft.Consenters.push(Consenters)
    configtx.Profiles.TwoOrgsOrdererGenesis.Orderer.Addresses.push(Addresses)
    configtx.Profiles.TwoOrgsOrdererGenesis.Orderer.Organizations.push(orderer)

    configtx.Profiles.TwoOrgsOrdererGenesis.Consortiums.SampleConsortium.Organizations.push(peerorg)

    configtx.Profiles.TwoOrgsChannel.Application.Organizations.push(peerorg)

    console.log(configtx)




    let yamlStr = jsyaml.dump(configtx)
    const newlink = document.createElement("a");

    newlink.href = URL.createObjectURL(new Blob([yamlStr], {
        type: "text/yaml"
    }));

    newlink.setAttribute("download", `configtx.yaml`);

    newlink.click();
 
}