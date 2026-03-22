import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

function getRewrites() {
  const rewrites: Record<string, string> = {}
  
  // English indexes
  rewrites['index_en.md'] = 'index.md'
  rewrites['index_zh.md'] = 'zh/index.md'

  const dirs = ['pre-training', 'tech-report']
  
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir)
    for (const file of files) {
      if (file.endsWith('_en.md')) {
        const base = file.replace('_en.md', '')
        rewrites[`${dir}/${file}`] = `${dir}/${base}.md`
      } else if (file.endsWith('_zh.md')) {
        const base = file.replace('_zh.md', '')
        rewrites[`${dir}/${file}`] = `zh/${dir}/${base}.md`
      }
    }
  }
  return rewrites
}

export default defineConfig({
  title: "Paper Reading Notes",
  description: "Interactive notes and analysis on LLMs and Machine Learning",
  
  // Set the base URL for GitHub Pages
  base: '/paper-reading/',

  srcExclude: ['node_modules/**', 'smol-training-playbook/**'],

  rewrites: getRewrites(),

  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ZeroYuHuang/paper-reading' }
    ],
    search: {
      provider: 'local'
    }
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Pre-training', link: '/pre-training/parallelism_strategies.md' }
        ],
        sidebar: [
          {
            text: 'Pre-training',
            items: [
              { text: 'Parallelism Strategies', link: '/pre-training/parallelism_strategies.md' },
              { text: 'Distributed Communication Ops', link: '/pre-training/distributed_communication_ops.md' },
              { text: 'Infrastructure Basics', link: '/pre-training/infrastructure_basics.md' },
              { text: 'Muon Optimizer', link: '/pre-training/muon_optimizer.md' },
              { text: 'Alternating Updates Efficient Transformers', link: '/pre-training/alternating_updates_efficient_transformers.md' },
              { text: 'Smol Training Playbook Note', link: '/pre-training/smol_training_playbook_infrastructure_note.md' }
            ]
          }
        ]
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '预训练', link: '/zh/pre-training/parallelism_strategies.md' }
        ],
        sidebar: [
          {
            text: '预训练 (Pre-training)',
            items: [
              { text: '并行策略 (Parallelism Strategies)', link: '/zh/pre-training/parallelism_strategies.md' },
              { text: '分布式通信算子 (Communication Ops)', link: '/zh/pre-training/distributed_communication_ops.md' },
              { text: '基础设施基础 (Infrastructure Basics)', link: '/zh/pre-training/infrastructure_basics.md' },
              { text: 'Muon 优化器 (Muon Optimizer)', link: '/zh/pre-training/muon_optimizer.md' },
              { text: '交替更新高效 Transformer', link: '/zh/pre-training/alternating_updates_efficient_transformers.md' },
              { text: '混合精度 ZERO', link: '/zh/pre-training/mixed_precision_zero.md' },
              { text: '为何低精度训练会失败', link: '/zh/pre-training/why_low_precision_transformer_training_fails_flash_attention.md' },
            ]
          },
          {
            text: '技术报告 (Tech Reports)',
            items: [
              { text: 'Step 3.5 Flash', link: '/zh/tech-report/step-3-5-flash.md' }
            ]
          }
        ],
        docFooter: {
          prev: '上一页',
          next: '下一页'
        },
        outline: {
          label: '页面导航'
        },
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式'
      }
    }
  }
})
