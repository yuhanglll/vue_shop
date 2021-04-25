import Vue from 'vue'
import {Button} from 'element-ui'
import {Form, FormItem} from 'element-ui'
import {Input} from 'element-ui'
import {Message} from 'element-ui'
import {Container} from "element-ui";
import {Header} from "element-ui";
import {Aside} from "element-ui";
import {Main} from "element-ui";
import {Menu} from "element-ui";
import {Submenu} from "element-ui";
import {MenuItem} from "element-ui";
import {Breadcrumb} from "element-ui";
import {BreadcrumbItem} from "element-ui";
import {Card} from "element-ui";
import {Row} from "element-ui";
import {Col} from "element-ui";
import {Table} from "element-ui";
import {TableColumn} from "element-ui";
import {Switch} from "element-ui";
import {Tooltip} from "element-ui";
import {Pagination} from "element-ui";
import {Dialog} from "element-ui";
import {MessageBox} from "element-ui";
import {Tag} from "element-ui";
import {Tree} from "element-ui";
import {Select} from "element-ui";
import {Option} from "element-ui";
import {Cascader} from "element-ui";
import {Alert} from "element-ui";
import {Tabs} from "element-ui";
import {TabPane} from "element-ui";

Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Alert)
Vue.use(Cascader)
Vue.use(Option)
Vue.use(Select)
Vue.use(Tree)
Vue.use(Tag)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(Tooltip)
Vue.use(Switch)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(BreadcrumbItem)
Vue.use(Breadcrumb)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
