import { defineComponent, getCurrentInstance, reactive, onMounted, computed, ref, render } from 'vue';
import '../style/inventory.scss';
import ListItem from './list_item';
import { getUrlKey } from '@/util/common.ts'
// import { getPageData } from '../api/inventory';
interface InvenTory {
    userInfo: {
        pic?: String; // ？表示userInfo对象中可能存在pic这个属性
        sname?: String;
    };
    pyCardList: [
        {
            name: String;
            summary: String;
            pic: String;
            href: String;
        }
    ];
    shareTitle: String;
    shareSummary: String;
    sharePic: String;
    listname: String;
    listSummary: String;
    inventoryId: String;
}
interface Data {
    inventory: InvenTory;
}
function dealData(ctx:any) {
    let Data: Data = reactive({
        inventory: {
            userInfo: {},
            pyCardList: [
                {
                    name: '',
                    summary: '',
                    pic: '',
                    href: '',
                }
            ],
            shareTitle: '',
            shareSummary: '',
            sharePic: '',
            listname: '',
            listSummary: '',
            inventoryId: ''
        }
    });
    const render = () => {
        console.log(ctx.ctx)
        let inventoryId = getUrlKey('inventoryId')
        let addUrl = 'http://127.0.0.1:3000/inventory'
        if (inventoryId && inventoryId !='') {
          addUrl += '?inventoryId=' + inventoryId
        }
        ctx.ctx.$axios({
            method:'get',
            url: addUrl
        }).then((res:any) => {
            let resp = res.data
            console.log(resp)
            Data.inventory.userInfo = resp.inventory.userInfo;
            Data.inventory.pyCardList = resp.inventory.contList;
            Data.inventory.listname = resp.inventory.name;
            Data.inventory.listSummary = resp.inventory.summary;
            Data.inventory.shareTitle = resp.inventory.shareTitle;
            Data.inventory.shareSummary = resp.inventory.shareSummary;
            Data.inventory.sharePic = resp.inventory.sharePic;
            Data.inventory.inventoryId = resp.inventory.inventoryId;
            ctx.mywindow.MobLink({
              el: '#moblink_py_list',
              path: 'demo/a',
              params: {
                contId: Data.inventory.inventoryId,
                contType: '61'
              }
            });
            ctx.mywindow.initHeadPanel({
              contType: 61,
              contId: Data.inventory.inventoryId
            })
            ctx.mywindow.baseMobLinkInit("a[id^='moblink']");
            ctx.mywindow.wxShare({
              title: Data.inventory.shareTitle,
              desc: Data.inventory.shareSummary,
              link: ctx.mywindow.location.href,
              img: Data.inventory.sharePic
            })
        }).catch(() => {
            console.log('请稍后重试')
        })
    }
    onMounted(render);
    return {Data}
}
const inventoryPage = defineComponent({
    setup() {
        const internalInstance  = getCurrentInstance()
        let {Data} = dealData(internalInstance)
        return () => (
            <div class="py_list_page">
                <div class="list_icon_box">
                  <div class="list_icon"></div>
                </div>
                <div class="user_info">
                  <img class="ui_img" src={`${Data.inventory.userInfo.pic}`} />
                  <p class="ui_name">{Data.inventory.userInfo.sname}</p>
                  <p class="ui_title">{Data.inventory.listname}</p>
                  <p class="ui_des">{Data.inventory.listSummary}</p>
                </div>
                <div class="py_card">
                   {Data.inventory.pyCardList.map((item, index) => {
                        return <div class="listitem">
                            <ListItem 
                            key={`${index}`}
                            title={`${item.name}`}
                            summary={`${item.summary}`}
                            img-url={`${item.pic}`}
                            detail-link={`${item.href}`}>
                            </ListItem>
                        </div>
                    })}
                </div>
                <a href="javascript:void(0);" ref="moblinkList" id="moblink_py_list" class="py_list_gomob" moblink-featured>打开APP，阅读体验更佳</a>
            </div>
        )
    }
});
export default inventoryPage