<!-- 模板选择 -->
<template>
  <div :class="$style.wrap">
    <div :class="$style.score">
      <em>{{score}}</em>
      <span>{{scoreText}}</span>
    </div>
    <section v-for="(item, index) of tips" :key="index">
      <h3>{{item.title}}</h3>
      <ul v-if="item.type === 'li'">
        <li
          v-for="(p, pIndex) of item.paragraphs"
          :key="pIndex"
          :text="p"
        />
      </ul>
      <p v-else
        v-for="(p, pIndex) of item.paragraphs"
        :key="pIndex"
        :text="p"
      />
    </section>
    <div :class="$style.jump">
      <Button>专家优化简历 面试机会翻倍</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Button } from 'vant'
import { Vue, Component } from 'vue-property-decorator'

const components = { Button }

@Component({ components })
export default class ScorePage extends Vue {
  private score: number

  private scoreText: string

  get tips () {
    return [
      {
        title: '什么是简历评分？',
        paragraphs: [
          `
简历评分是根据简历的完整度、丰富度、内容质量等多个角度，结合行业标准，综合衡量出的一项代表简历竞争水平的分值。
数据追踪表明：简历评分分值越高，在面试求职及后续的职业发展中通常更有优势，易获得更多面试机会及人脉资源。
`,
        ],
      },
      {
        title: '提高评分的好处？',
        type: 'li',
        paragraphs: [
          '留下好的第一印象。',
          '收到更多面试邀约。',
          '提高求职通过率。',
        ],
      },
      {
        title: '如何提高评分？',
        paragraphs: [
          `一份拥有足够必要信息的简历就可以在投递中收获不错的效果了，但我们的非必选项及贴士都能在一定程度上帮您更好地展示自己的优点及特色，建议您根据自身实际情况参考填写哦！`,
        ],
      },
    ]
  }
}
</script>

<style lang="scss" module>
.wrap {
  .jump {
    :global {
      .vant-button {
        border-radius: 4px;
      }
    }
  }
}
</style>