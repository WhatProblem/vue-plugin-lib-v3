<template>
  <div class="vlist-vue2">
    <div class="container">
      <div class="list-header">
        <div class="header-label" :style="headerLabelStyle">
          {{ labelName }}
        </div>
        <div
          ref="headValue"
          class="header-value"
          :style="headerValueStyle"
          @click="onShowList"
        >
          <span class="vlist-icon">
            <svg
              t="1651128828208"
              :class="['v-list-svg-icon', (isShowList && 'is-rotate') || '']"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2416"
              width="14"
              height="14"
            >
              <path
                d="M512 714.666667c-8.533333 0-17.066667-2.133333-23.466667-8.533334l-341.333333-341.333333c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0l320 317.866667 317.866667-320c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8L533.333333 704c-4.266667 8.533333-12.8 10.666667-21.333333 10.666667z"
                p-id="2417"
                fill="#c0c4cc"
              ></path>
            </svg>
          </span>
          <span v-show="!selectLabel" class="placeholder">{{
            placeholder
          }}</span>
          <span v-show="selectLabel">{{ selectLabel }}</span>
        </div>
      </div>
      <transition name="el-zoom-in-top">
        <div
          v-show="isShowList"
          ref="listWrap"
          class="list-wraper"
          :style="leftStyle"
          @scroll="onScroll"
        >
          <div ref="scrollbar" class="scroll-bar">
            <div v-if="!options.length" class="no-data">暂无数据</div>
          </div>
          <div ref="list" class="list">
            <div
              v-for="(item, index) in showList"
              :key="index"
              :style="listEleStyle"
              :class="['list-ele', isActive(item)]"
              @click="onSelect(item)"
            >
              <slot :item="item">{{ item.label }}</slot>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "VirListV3",
};
</script>

<script lang="ts" setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  Ref,
  ref,
  unref,
  watch,
} from "vue";

type VModel = string | number | boolean;
const props = withDefaults(
  defineProps<{
    modelValue: VModel;
    labelName?: string;
    placeholder?: string;
    options?: Array<any>;
    labelWidth?: string;
    labelPositon?: string;
    headerHeight?: string;
    showNum?: number;
    lineHeight?: number;
  }>(),
  {
    // label 标题
    labelName: "",
    placeholder: "请选择内容",
    // 传入的数据列表
    options: () => [],
    // label 文案宽度
    labelWidth: "72",
    // 文案默认
    labelPositon: "right",
    // 选择框高度
    headerHeight: "30",
    // 弹框默认展示条数
    showNum: 10,
    // 每一行数据的高度
    lineHeight: 30,
  }
);
const emits = defineEmits<{ (e: "change", params: any): void }>();

// 选中的 value
const selectValue = ref();
// 滚动开始的索引
const start = ref(0);
// 滚动结束的索引
const end = ref(10);
// 依赖数据列表弹框控制
const isShowList = ref(false);
// 弹窗出现，待重新选择时候的临时依赖数据
const tempSelectItem = ref({ label: "", value: "" });
// 控制 watch 的 initScroll 优化函数只执行一次
const onceExec = ref(false);
// 控制是否有点击选中过
const isSelected = ref(false);
// 监听的回调函数
type EventCb = null | Function;
let eventCb: EventCb = null;

// list 容器
const list = ref<any>();
// listWrap 容器
const listWrap = ref<any>();
// scrollbar 容器
const scrollbar = ref<any>();
// 输入框容器
const headValue = ref<any>();

// 动态设置 label 样式
const headerLabelStyle = computed(() => ({
  width: `${props.labelWidth}px`,
  height: `${props.headerHeight}px`,
  lineHeight: `${props.headerHeight}px`,
  textAlign: props.labelPositon,
}));
// 动态设置头部选择框的样式
const headerValueStyle = computed(() => ({
  height: `${props.headerHeight}px`,
  lineHeight: `${Number(props.headerHeight) - 2}px`,
}));
// 动态设置每一行数据的样式
const listEleStyle = computed(() => ({
  height: `${props.headerHeight}px`,
  lineHeight: `${props.headerHeight}px`,
}));
// 动态设置右侧整体样式
const leftStyle = computed(()=>({
	width: props.labelName && `calc(100% - ${props.labelWidth}px)` || '100%',
	left: props.labelName && `${props.labelWidth}px` || 0,
	top: `${Number(props.headerHeight) + 10}px`
}))

// 动态获取弹框展示数据
const showList = computed(() => props.options.slice(start.value, end.value));
// 选中value对应的label
const selectLabel = computed(() => {
  if (isShowList.value || isSelected.value) {
    return tempSelectItem.value.label;
  }
  return (
    (showList.value.find((item) => item.value === selectValue.value) || {})
      .label || selectValue.value
  );
});

// 初始化 初始展示的列表数据
const initScroll = () => {
  const index = props.options.findIndex(
    (item) => item.value === selectValue.value
  );
  start.value = (index > -1 && index) || 0;
  end.value = start.value + props.showNum;

  unref(listWrap).scrollTop = start.value * props.lineHeight;

  // 绝对定位相对偏移量
  unref(list).style.top = start.value * props.lineHeight + "px";
};

const initWrap = () => {
  // 滚动容器的高度
  // this.$refs.listWrap.style.height = this.lineHeight * this.showNum + 'px'
  // this.$refs.listWrap.style['max-height'] = this.lineHeight * this.showNum + 'px'
  unref(listWrap).style["max-height"] =
    props.lineHeight *
      minValue(props.showNum, maxValue(props.options.length, 1)) +
    "px";
  // 计算总的数据需要的高度，构造滚动条高度
  unref(scrollbar).style.height =
    props.lineHeight * maxValue(props.options.length, 1) + "px";
};

// 获取初始值
const initValue = () => {
  const index = props.options.findIndex(
    (item) => item.value === selectValue.value
  );
  start.value = (index > -1 && index) || 0;
  end.value = start.value + props.showNum;

  // 初始化回显值的依赖数据
  const temp = props.options.find(
    (item) => item.value === selectValue.value
  ) || { label: selectValue.value, value: selectValue.value };
  tempSelectItem.value = JSON.parse(JSON.stringify(temp));
};

// 初始化
const init = () => {
  selectValue.value = props.modelValue;
};

init();

// 监听初始化回显数据 变量设置
watch(
  () => isShowList.value,
  (cur, prev) => {
    if (cur && onceExec.value) {
      onceExec.value = false;
      nextTick(() => {
        initScroll();
      });
    }
  }
);

onMounted(() => {
  onceExec.value = true;
  initWrap();
  initValue();
  // 监听事件点击
  nextTick(() => {
    eventCb = clickEmptyClose(headValue);
  });
});

onBeforeUnmount(() => {
  (eventCb as Function)();
  eventCb = null;
});

const onScroll = () => {
  // 获取滚动高度
  const { scrollTop } = unref(listWrap);
  // 开始的数组索引
  start.value = Math.floor(scrollTop / props.lineHeight);
  // 结束索引
  end.value = start.value + props.showNum;
  // 绝对定位相对偏移量
  unref(list).style.top = start.value * props.lineHeight + "px";
};

// 点击输入框
const onShowList = () => {
  isShowList.value = !isShowList.value;
};

// 选中单行数据
const onSelect = (row: { value: any }) => {
  isSelected.value = true;

  const temp = showList.value.find((item) => item.value === row.value) || {};
  selectValue.value = temp.value;

  tempSelectItem.value = JSON.parse(JSON.stringify(temp));

  emits("change", selectValue.value);

  isShowList.value = false;
};

const isActive = (row: { value: any }) => {
  return (selectValue.value === row.value && "active-line") || "";
};

/** ********** 公共方法 *****************/

// 获取最小值
function minValue(...rest: any[]) {
  if (!rest.length) {
    throw new Error("比对数值不能为空");
  }
  return Math.min(...rest);
}

function maxValue(...rest: any[]) {
  if (!rest.length) {
    throw new Error("比对数值不能为空");
  }
  return Math.max(...rest);
}

// 点击空白区域关闭弹框
function clickEmptyClose(headValue: Ref) {
  const callback = (e: { target: any }) => {
    // const headValue = this.$refs.headValue
    if (headValue.value) {
      if (!headValue.value.contains(e.target)) {
        isShowList.value = false;
      }
    }
  };

  document.addEventListener("mouseup", callback);

  return () => {
    document.removeEventListener("mouseup", callback);
  };
}
</script>

<style scoped>
.container {
  width: 100%;
  position: relative;
}
.header-label {
  float: left;
  box-sizing: border-box;
  padding-right: 6px;
  font-size: 14px;
  color: #606266;
  font-weight: 700;
}

.header-value {
  cursor: pointer;
  overflow: hidden;
  height: 100%;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  background: #fff;
  border-radius: 4px;
  color: #606266;
  font-size: 14px;
  padding: 0 15px;
  padding-right: 30px;
  position: relative;
  text-align: left;
}

.vlist-icon {
  position: absolute;
  top: 0;
  right: 0;
  width: 28px;
  text-align: center;
  vertical-align: middle;
}

.v-list-svg-icon {
  vertical-align: middle;
  transition: all 0.25s;
}

.is-rotate {
  transform: rotate(180deg);
}

.list-wraper {
  transform-origin: center top;
  position: absolute;
  z-index: 99999;
  background: #fff;
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.no-data {
  color: #999;
  font-size: 14px;
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.list {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.list-ele {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  cursor: pointer;
  color: #606266;
  font-size: 14px;
  text-align: left;
}
.list-ele:hover {
  background: #f5f7fa;
}

.active-line {
  color: #409eff;
}

.el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1),
    opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transform-origin: center top;
}

.el-zoom-in-top-enter-from,
.el-zoom-in-top-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
</style>