const { MessageEmbed } = require("discord.js")
const { color } = require("../../config.json")

module.exports = {
    name: "covid",
    alases: ["cov"],
    cooldown: 50000,

    async execute (client, message, args) {
        const axios = require("axios")
        var data = (await axios.get("https://api.meewmeew.ml/covid")).data;

        var world = data.world,
            vn = data.vietnam,
            news = data.news,
            nhiemtg = world.cases,
            chettg = world.deaths,
            hoiphuctg = world.recovered,
            nhiemvn = vn.cases,
            chetvn = vn.deaths,
            hoiphucvn = vn.recovered,
            dieutrivn = vn.recovering,      
            ptchetvn = Math.round(chetvn.replace(/\./g,"") * 100 / nhiemvn.replace(/\./g,"")),
            pthoiphucvn = Math.round(hoiphucvn.replace(/\./g,"") * 100 / nhiemvn.replace(/\./g,"")),
            ptchettg = Math.round(chettg.replace(/\./g,"") * 100 / nhiemtg.replace(/\./g,"")),
            pthoiphuctg = Math.round(hoiphuctg.replace(/\./g,"") * 100 / nhiemtg.replace(/\./g,"")),
            pthoiphucvn = pthoiphucvn.toString().split(".")[0],
            ptdieutrivn = (100 - pthoiphucvn - ptchetvn).toString().split(".")[0];
            ptchetvn = ptchetvn.toString().split(".")[0];
            pthoiphuctg = pthoiphuctg.toString().split(".")[0];
            ptchettg = ptchettg.toString().split(".")[0];

        const embed = new MessageEmbed()
            .setColor(`${color[0].primary}`)
            .setTitle('Tình hình dịch bệnh Covid')
            .setDescription('Dữ liệu dưới đây được lấy từ Bộ Y Tế, cam kết chính xác 100%')
            .addField(`------------------------- Thế giới ------------------------`,'\u200B')
            .addFields(

                { name: "😷 Nhiễm", value: `${nhiemtg}`},
                { name: "💚 Hồi phục", value: `${hoiphuctg} (${pthoiphuctg}%)`, inline: true},
                { name: "💀 Tử vong", value: `${chettg} (${ptchettg}%)`, inline: true}
            )
            .addField(`------------------------- Việt nam ------------------------`,'\u200B')
            .addFields(
                
                { name: "😷 Nhiễm", value: `${nhiemvn}`},
                { name: "💚 Hồi phục", value: `${hoiphucvn} (${pthoiphucvn}%)`, inline: true},
                { name: "💀 Tử vong", value: `${chetvn} (${ptchetvn}%)`, inline: true}
            )
            .addField("💉 Đang điều trị:", `${dieutrivn} (${ptdieutrivn}%)`)
            .setFooter(`Cập nhật: ${data.time}`);

        message.channel.send(embed)

    }

}