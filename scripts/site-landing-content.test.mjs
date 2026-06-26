import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { landingContent } from '../site/src/data/landing-content.js';

const pagePath = path.resolve('site/src/pages/index.astro');
const localizedPagePath = path.resolve('site/src/pages/[locale].astro');
const landingComponentPath = path.resolve('site/src/components/LandingPage.astro');
const landingContentPath = path.resolve('site/src/data/landing-content.js');
const astroConfigPath = path.resolve('site/astro.config.mjs');

describe('Rulewright landing page source', () => {
  it('contains the core hero, demo, and install links', async () => {
    const source = [
      await fs.readFile(landingContentPath, 'utf8'),
      await fs.readFile(landingComponentPath, 'utf8'),
    ].join('\n');

    assert.match(source, /Turn agent mistakes into rules/);
    assert.match(source, /Your agent messed up\. Keep the lesson\./);
    assert.match(source, /https:\/\/github\.com\/jdeploys\/rulewright/);
    assert.match(source, /demo-transcript/);
    assert.match(source, /npm run install:codex/);
  });

  it('configures Astro for the GitHub Pages project path', async () => {
    const source = await fs.readFile(astroConfigPath, 'utf8');

    assert.match(source, /site:\s*'https:\/\/jdeploys\.github\.io'/);
    assert.match(source, /base:\s*'\/rulewright'/);
  });

  it('adds restrained landing motion with reduced-motion support', async () => {
    const source = await fs.readFile(landingComponentPath, 'utf8');

    assert.match(source, /@keyframes panel-rise/);
    assert.match(source, /@keyframes rule-reveal/);
    assert.match(source, /class="patch-line"/);
    assert.match(source, /prefers-reduced-motion:\s*reduce/);
    assert.match(source, /animation:\s*none\s*!important/);
  });

  it('presents the current localized language support', async () => {
    const source = await fs.readFile(landingContentPath, 'utf8');
    const component = await fs.readFile(landingComponentPath, 'utf8');

    assert.match(source, /const locales = \[/);
    assert.match(source, /English/);
    assert.match(source, /Korean/);
    assert.match(source, /Japanese/);
    assert.match(source, /Chinese/);
    assert.match(source, /Spanish/);
    assert.match(source, /Concise communication/);
    assert.match(component, /Localized rule templates/);
  });

  it('builds localized landing routes with a language switcher', async () => {
    const indexSource = await fs.readFile(pagePath, 'utf8');
    const localizedSource = await fs.readFile(localizedPagePath, 'utf8');
    const component = await fs.readFile(landingComponentPath, 'utf8');
    const content = await fs.readFile(landingContentPath, 'utf8');

    assert.match(indexSource, /currentLocale="en"/);
    assert.match(localizedSource, /getStaticPaths/);
    assert.match(localizedSource, /locale !== 'en'/);
    assert.match(component, /language-switcher/);
    assert.match(component, /hreflang/);
    assert.match(content, /ko:\s*{/);
    assert.match(content, /ja:\s*{/);
    assert.match(content, /zh:\s*{/);
    assert.match(content, /es:\s*{/);
  });

  it('uses native language names and locale-specific samples', async () => {
    const component = await fs.readFile(landingComponentPath, 'utf8');

    assert.match(component, /locale\.nativeName/);
    assert.equal(landingContent.en.examples.items[2].label, 'Concise communication');
    assert.match(landingContent.en.examples.items[2].correction, /too long/i);
    assert.equal(landingContent.ko.examples.items[2].label, '한국어 규칙 보존');
    assert.match(landingContent.ko.examples.items[2].rule, /한국어 규칙/);
    assert.equal(landingContent.ja.examples.items[2].label, '簡潔な応答');
    assert.match(landingContent.ja.examples.items[2].rule, /結果を先に/);
    assert.equal(landingContent.zh.examples.items[2].label, '简洁回复');
    assert.match(landingContent.zh.examples.items[2].rule, /先说明结果/);
    assert.equal(landingContent.es.examples.items[2].label, 'Respuesta concisa');
    assert.match(landingContent.es.examples.items[2].rule, /Empieza por el resultado/);
  });
});
