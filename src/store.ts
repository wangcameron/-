export interface Asset {
  id: number;
  name: string;
  type: string;
  size: string;
  date: string;
  folderId: number;
  url?: string;
  content?: string;
}

class Store {
  assets: Asset[] = [
    { id: 1, name: '逆水寒新流派设定集.pdf', type: 'pdf', size: '2.4 MB', date: '2026-02-20', folderId: 1, content: '这是逆水寒新流派的设定集内容...' },
    { id: 2, name: '春季宣发核心卖点.docx', type: 'word', size: '1.1 MB', date: '2026-02-22', folderId: 1, content: '春季宣发核心卖点：1. 新外观 2. 新玩法' },
    { id: 3, name: '神相角色四视图-默认外观.png', type: 'image', size: '4.5 MB', date: '2026-02-25', folderId: 4, url: 'https://picsum.photos/seed/char1/200/200' },
    { id: 4, name: '碎梦角色四视图-默认外观.png', type: 'image', size: '4.2 MB', date: '2026-02-25', folderId: 4, url: 'https://picsum.photos/seed/char2/200/200' },
    { id: 5, name: 'SKILL.md', type: 'md', size: '12 KB', date: '2026-03-02', folderId: 6, content: '# 写作技巧\n1. 渐进式披露：不要一次性抛出所有信息，要像剥洋葱一样层层递进，先抛出悬念或痛点，再逐步给出解决方案和核心卖点。\n2. 情绪共鸣：多用第一人称，表达真实的感受，拉近与读者的距离。\n3. 痛点切入：先指出玩家的痛点，再给出解决方案。\n4. 爆款词汇：多用“绝绝子”、“狠狠拿捏”、“谁懂啊”等小红书高频词汇。' }
  ];

  listeners: (() => void)[] = [];

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  getAssets() {
    return this.assets;
  }

  addAssets(newAssets: Asset[]) {
    this.assets = [...newAssets, ...this.assets];
    this.notify();
  }

  notify() {
    this.listeners.forEach(l => l());
  }
}

export const globalStore = new Store();
