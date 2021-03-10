function createOrgYaml(){

    var orglist=[]
    var total_org=document.querySelector("tbody").rows.length
    var table=document.querySelector("tbody")

    for (var i = 0; i < total_org; i++) {

        var orgname= table.rows[i].cells[0].children[0].value;
        var orgdomain=table.rows[i].cells[1].children[0].value;
        var enablenodeofus=Boolean(table.rows[i].cells[2].children[0].valueAsNumber);
        var totalpeers=table.rows[i].cells[3].children[0].valueAsNumber;
        var sans=table.rows[i].cells[4].children[0].value;
        var totalusers=table.rows[i].cells[5].children[0].valueAsNumber;

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

    }

    for (var i = 0; i < total_org; i++) {

        let yamlStr = jsyaml.safeDump(orglist[i])
        const newlink = document.createElement("a");

        newlink.href = URL.createObjectURL(new Blob([yamlStr], {
            type: "text/yaml"
        }));

        newlink.setAttribute("download", `${orglist[i].PeerOrgs.Name}.yaml`);

        newlink.click();
        
    }


}

function createConfigtx(){

    
   
    

    var configtx={
        "Organizations" :[],

    }
    configtx.Organizations.push(org)

    let yamlStr = jsyaml.safeDump(configtx)
    const newlink = document.createElement("a");

    newlink.href = URL.createObjectURL(new Blob([yamlStr], {
        type: "text/yaml"
    }));

    newlink.setAttribute("download", `apple.yaml`);

    newlink.click();
 
}