var orglist = []
function Create() {
    var total_orgs = document.querySelector('tbody').rows
    var x = document.querySelector('tbody');

    for (var i = 0; i < total_orgs.length; i++) {
        var orgname = x.rows[i].cells[0].children[0].value;
        var domain = x.rows[i].cells[1].children[0].value;
        var EnableNodeOUs = Boolean(parseInt(x.rows[i].cells[2].children[0].value));
        var peer = parseInt(x.rows[i].cells[3].children[0].value);
        var sans = x.rows[i].cells[4].children[0].value;
        var users = parseInt(x.rows[i].cells[5].children[0].value);
        orglist.push({
            "PeerOrgs":
            {
                "Name": orgname, "Domain": domain, "EnableNodeOUs": EnableNodeOUs,
                "Template": { "Count": peer, "SANS": [sans] },
                "Users": { "Count": users }
            }
        })

    }

    for (var i = 0; i < total_orgs.length; i++) {
        console.log(orglist[i])
        let yamlStr = jsyaml.safeDump(orglist[i])
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([yamlStr], {
            type: "text/yaml"
        }));
        a.setAttribute("download", `${orglist[i].PeerOrgs.Name}.yaml`);

        a.click();
    }

   CreateConfigtx()
}
function CreateConfigtx() {
    var Allorgs = []
    console.log(orglist)
    Allorgs.push( {
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
            "orderer.example.com:7050"
        ]
    })
    for (var i = 0; i < orglist.length; i++) {
        var id=orglist[i].PeerOrgs.Name+"MSP"
        Allorgs.push({
            Name: orglist[i].PeerOrgs.Name,
            ID: id,
            MSPDir: `../organizations/peerOrganizations/${orglist[i].PeerOrgs.Domain}/msp`,
            Policies: {
                Readers: {
                    Type: "Signature",
                    Rule: `OR('${id}.member')`
                },
                Writers: {
                    Type: "Signature",
                    Rule: `OR('${id}.member')`
                },
                Admins: {
                    Type: "Signature",
                    Rule: `OR('${id}.admin')`
                }
            },
            AnchorPeers: [
                {
                    "Host": orglist[i].PeerOrgs.Domain,
                    "Port": 000
                }
            ]
        })
    }
    var peerorgs=Allorgs.slice(1,Allorgs.length);
    var x = {
        "Organizations": [],
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
                "Consenters": [
                    {
                        "Host": "orderer.example.com",
                        "Port": 7050,
                        "ClientTLSCert": "../organizations/ordererOrganizations/example.com/orderers/orderer.example.com/tls/server.crt",
                        "ServerTLSCert": "../organizations/ordererOrganizations/example.com/orderers/orderer.example.com/tls/server.crt"
                    }
                ]
            },
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
                        "Consenters": [
                            {
                                "Host": "orderer.example.com",
                                "Port": 7050,
                                "ClientTLSCert": "../organizations/ordererOrganizations/example.com/orderers/orderer.example.com/tls/server.crt",
                                "ServerTLSCert": "../organizations/ordererOrganizations/example.com/orderers/orderer.example.com/tls/server.crt"
                            }
                        ]
                    },
                    "BatchTimeout": "2s",
                    "BatchSize": {
                        "MaxMessageCount": 10,
                        "AbsoluteMaxBytes": "99 MB",
                        "PreferredMaxBytes": "512 KB"
                    },
                    "Organizations":[],
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
                        "Organizations": []
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
    for(var i=0;i<Allorgs.length;i++)
    {
        x.Organizations.push(Allorgs[i])
    }
    x.Profiles.TwoOrgsOrdererGenesis.Orderer.Organizations.push(Allorgs[0])
    console.log(peerorgs)
    for(i=0;i<peerorgs.length;i++)
    {
        x.Profiles.TwoOrgsOrdererGenesis.Consortiums.SampleConsortium.Organizations.push(peerorgs[i])
        x.Profiles.TwoOrgsChannel.Application.Organizations.push(peerorgs[i])
    }
    let yamlStr = jsyaml.safeDump(x)
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([yamlStr], {
        type: "text/yaml"
    }));
    a.setAttribute("download", `configtx.yaml`);

    a.click();

}