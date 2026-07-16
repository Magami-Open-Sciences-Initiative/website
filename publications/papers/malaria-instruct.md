---
title: "Malaria-Instruct: A Low-Resource Benchmark for Instruction-Tuned LLMs in Antimalarial Drug Discovery"
authors: "Ajala, M., Adesina, C.& Ashimiyu-Abdusalam, Z."
journal: "Zenodo"
year: 2026
doi: "10.5281/zenodo.19222923"
type: data
tags:
  - Malaria
  - LLM
  - Drug Discovery
excerpt: "We present Malaria-Instruct, a specialized dataset designed to evaluate and fine-tune Large Language Models (LLMs) for molecular property prediction, specifically targeting antimalarial activity."
---

While derived from ChEMBL, this dataset has been significantly restructured, filtered, and formatted for instruction-tuning and virtual screening tasks in resource-constrained research environments.

Key Features:

- Instruction-Response Format: Data is structured as natural language prompts (SMILES strings as input, binary activity as output) to align with the training objectives of modern LLMs (e.g., Gemma, LlaSMO, Mistral).
- Rigorous Dissimilarity Splitting: Unlike standard random or scaffold splitting, this dataset employs a "Hard Split" based on molecular dissimilarity (Tanimoto coefficient <0.4 for train-test and 0.5 for train-val). This ensures that models are tested on their ability to generalize to novel chemical spaces, simulating real-world lead optimization.
- Neglected Disease Focus: Specifically curated from assays involving various strains of Plasmodium falciparum, addressing the data gap in AI for the Global South. It contains assay on different strains on Plasmodium falciparum
