import {defineComponent}from 'vue';
const Itema = defineComponent({
    props:{
      title: String,
      summary: String,
      imgUrl: String,
      detailLink: String,
    },
    setup(props){
        return () => (
            <div class="py_card_item">
                <div class="pci_img_box">
                   <img src={`${props.imgUrl}`} alt="" class="pci_img" />
                </div>
                <p class="pci_title">{props.title}</p>
                <p class="pci_des">{props.summary}</p>
                <a href={`${props.detailLink}`}>
                <div class="pci_more">查看详情{">"}{">"}</div>
                </a>
            </div>
        )
    }
  })
  export default Itema