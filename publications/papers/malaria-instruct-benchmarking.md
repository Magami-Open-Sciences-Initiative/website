---
title: "Rigorous Evaluation of Large Language Models for Malaria Drug Discovery: Trade-offs in Performance, Scale, and Resource Utility"
authors: "Ajala, M., Ashimiyu-Abdusalam, Z. & Adesina, C."
journal: "Arxiv"
doi: "arXiv:2608.20418"
year: 2026
type: preprint
tags:
  - LLM
  - Benchmark
  - Malaria
excerpt: "We present a systematic evaluation of five open-source LLMs on Malaria-Instruct using a rigorous out-of-distribution data split"
---

We introduce Malaria-Instruct, a curated instruction-following dataset derived from the ChEMBL Legacy Malaria corpus for Malaria virtual screening, and conduct a systematic evaluation of five open-source LLMs; Gemma-2 2B/9B, TxGemma-2B/9B, and LlaSMol-Mistral-7B, on a rigorous out-of-distribution data split. Performance was benchmarked against classical ML models (Random Forest, XGBoost) and frontier proprietary models (Gemini 2.5, OpenAI o3) under few-shot conditions. Fine-tuned LLMs substantially outperformed all baselines: TxGemma-9B achieved the highest ROC-AUC (0.731±0.005) and LlaSMol-Mistral-7B the best enrichment factor (EF@1% ≈ 4.99). Domain-specific fine-tuning proved categorically indispensable with TxGemma-9B collapsing from ROC-AUC 0.731 to 0.499, under its best few-shot condition, and neither Gemini 2.5 (ROC-AUC ≈ 0.53) nor o3 (ROC-AUC ≈ 0.59) achieved reliable discrimination without fine-tuning. Biomedical pretraining conferred a measurable advantage at equivalent scale, while chemistry-aware pretraining yielded superior prospective enrichment. Fine-tuned open-source LLMs represent a compelling, resource-efficient paradigm for antimalarial VS, outperforming both classical pipelines and proprietary reasoning models under structurally challenging conditions.
