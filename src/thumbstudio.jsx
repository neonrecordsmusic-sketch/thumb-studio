import { useState, useEffect } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const NICHES = ["Reggaeton / Perreo","Finanças / Renda Extra","Gaming / eSports","Fitness / Saúde","Culinária","Motivacional","Tecnologia / IA","Entretenimento","Beleza / Moda","Esportes","Empreendedorismo","Educação / Estudo","Política","True Crime / Mistério","Viagem"];
const DIMENSIONS = [
  { id:"youtube",   label:"YouTube",       sub:"16:9",  icon:"▬" },
  { id:"story",     label:"Story / TikTok",sub:"9:16",  icon:"▯" },
  { id:"square",    label:"Square",        sub:"1:1",   icon:"□" },
  { id:"portrait",  label:"Vert",          sub:"Portrait", icon:"▯" },
  { id:"landscape", label:"Horiz",         sub:"Landscape", icon:"▭" },
];
const GENDERS     = ["Man","Woman","Any / None"];
const LIFE_STAGES = ["Child","Young","Adult","Old","Any / None"];
const SKIN_TONES  = [
  { id:"light",       color:"#f5cba7" },
  { id:"medium-light",color:"#d4956a" },
  { id:"medium",      color:"#b07040" },
  { id:"medium-dark", color:"#8b5a2b" },
  { id:"dark",        color:"#3a1a05" },
  { id:"any",         color:"conic-gradient(#f5cba7,#d4956a,#8b5a2b,#3a1a05,#f5cba7)" },
];
const VISUAL_STYLES = ["Hyper Realistic","Cinematic","3D Render","Cartoon / Anime","Dark / Moody","Vibrant / Colorful","Minimalist","Retro 80s","Comic / HQ","Watercolor"];
const EXPRESSIONS  = ["Shocked","Curious","Happy","Fear","Angry","Confident","Mysterious","Laughing"];
const LANGUAGES    = [{ id:"en", flag:"🇺🇸", label:"EN" },{ id:"pt", flag:"🇧🇷", label:"PT" },{ id:"es", flag:"🇪🇸", label:"ES" }];
const PLACEMENT_GRID = [
  ["top-left","top-center","top-right"],
  ["mid-left","center","mid-right"],
  ["bot-left","bot-center","bot-right"],
];
const PLACEMENT_LABEL = {
  "top-left":"TOP LEFT","top-center":"TOP CENTER","top-right":"TOP RIGHT",
  "mid-left":"CENTER LEFT","center":"CENTER","mid-right":"CENTER RIGHT",
  "bot-left":"BOTTOM LEFT","bot-center":"BOTTOM CENTER","bot-right":"BOTTOM RIGHT",
};

// ─── Traduções / i18n ─────────────────────────────────────────────────────────
const T = {
  en: {
    logoSub: "ARCHITECT V4.1",
    apiSettings: "API SETTINGS",
    nicheLabel: "NICHE / TOPIC",
    nichePlaceholder: "e.g. How to Make $10k a Month...",
    dimensionsLabel: "DIMENSIONS",
    characterLabel: "CHARACTER SETTINGS",
    withCharacter: "With Character",
    noCharacter: "No Character",
    gender: "GENDER",
    lifeStage: "LIFE STAGE",
    skinTone: "SKIN TONE",
    expression: "EXPRESSION",
    visualStyle: "VISUAL STYLE",
    extraDetails: "EXTRA DETAILS",
    extraPlaceholder: "Props, background elements, special effects...",
    generateBtn: "▶ GENERATE BLUEPRINT",
    generating: "GENERATING...",
    tabPreview: "Preview",
    tabBlueprint: "Blueprint",
    tabImage: "Image",
    livePreview: "LIVE PREVIEW",
    blueprintResult: "BLUEPRINT RESULT",
    generatedImage: "GENERATED IMAGE",
    copyBlueprint: "⧉ Copy Blueprint",
    copied: "✓ Copied!",
    generateImage: "🖼 Generate Image",
    generatingImg: "Generating...",
    download: "⬇ Download",
    generateBlueprintShort: "▶ Generate Blueprint",
    generatingShort: "Generating...",
    noBlueprintTitle: "No blueprint yet",
    noBlueprintSub: "Fill the sidebar and click Generate Blueprint",
    craftingBlueprint: "Crafting your blueprint...",
    generatingThumbnail: "Generating thumbnail image...",
    noApiKey: "Configure your API Key in API SETTINGS",
    generateFirst: "Generate a blueprint first, then click Generate Image",
    placementLabel: "PLACEMENT",
    textLayers: "TEXT LAYERS",
    apiStatus: "API STATUS",
    geminiConnected: "Gemini Connected",
    hfConnected: "HuggingFace Connected",
    noKey: "No API Key",
    changeKey: "Change Key",
    configureApi: "Configure API",
    apiModalTitle: "API SETTINGS",
    apiModalSub: "Select provider for image generation",
    apiKeyLabel: "API KEY",
    saveKey: "Save API Key",
    savedKey: "✓ Saved!",
    remove: "Remove",
    geminiInstructions: <>Go to <span style={{color:"#ff0000",fontWeight:700}}>aistudio.google.com</span> → "Get API Key" → "Create API Key". No credit card required.</>,
    hfInstructions: <>Sign up at <span style={{color:"#ff0000",fontWeight:700}}>huggingface.co</span> → Settings → Access Tokens → New Token (Read). Free.</>,
    previewLive: "LIVE PREVIEW — ",
    previewHint: "UPDATES IN REAL TIME · GENERATE BLUEPRINT FOR DETAILS",
    fillNiche: "FILL NICHE TO PREVIEW",
    formatLabel: "FORMAT",
    layerPlaceholder: (n) => `Layer ${n} text...`,
    layerLabel: "LAYER",
    horizontal: "HORIZONTAL",
    vertical: "VERTICAL",
    footerLabel: "BLUEPRINT V4.1 FINAL",
    gendersMap: { Man:"Man", Woman:"Woman", "Any / None":"Any / None" },
    lifeStagesMap: { Child:"Child", Young:"Young", Adult:"Adult", Old:"Old", "Any / None":"Any / None" },
    expressionsMap: { Shocked:"Shocked", Curious:"Curious", Happy:"Happy", Fear:"Fear", Angry:"Angry", Confident:"Confident", Mysterious:"Mysterious", Laughing:"Laughing" },
  },
  pt: {
    logoSub: "ARQUITETO V4.1",
    apiSettings: "CONFIG. API",
    nicheLabel: "NICHO / TEMA",
    nichePlaceholder: "ex: Como Ganhar R$10k por Mês...",
    dimensionsLabel: "DIMENSÕES",
    characterLabel: "CONFIGURAR PERSONAGEM",
    withCharacter: "Com Personagem",
    noCharacter: "Sem Personagem",
    gender: "GÊNERO",
    lifeStage: "FASE DA VIDA",
    skinTone: "TOM DE PELE",
    expression: "EXPRESSÃO",
    visualStyle: "ESTILO VISUAL",
    extraDetails: "DETALHES EXTRAS",
    extraPlaceholder: "Adereços, elementos de fundo, efeitos especiais...",
    generateBtn: "▶ GERAR BLUEPRINT",
    generating: "GERANDO...",
    tabPreview: "Prévia",
    tabBlueprint: "Blueprint",
    tabImage: "Imagem",
    livePreview: "PRÉVIA AO VIVO",
    blueprintResult: "RESULTADO DO BLUEPRINT",
    generatedImage: "IMAGEM GERADA",
    copyBlueprint: "⧉ Copiar Blueprint",
    copied: "✓ Copiado!",
    generateImage: "🖼 Gerar Imagem",
    generatingImg: "Gerando...",
    download: "⬇ Baixar",
    generateBlueprintShort: "▶ Gerar Blueprint",
    generatingShort: "Gerando...",
    noBlueprintTitle: "Nenhum blueprint ainda",
    noBlueprintSub: "Preencha a barra lateral e clique em Gerar Blueprint",
    craftingBlueprint: "Criando seu blueprint...",
    generatingThumbnail: "Gerando imagem da thumbnail...",
    noApiKey: "Configure sua API Key em CONFIG. API",
    generateFirst: "Gere um blueprint primeiro, depois clique em Gerar Imagem",
    placementLabel: "POSICIONAMENTO",
    textLayers: "CAMADAS DE TEXTO",
    apiStatus: "STATUS DA API",
    geminiConnected: "Gemini Conectado",
    hfConnected: "HuggingFace Conectado",
    noKey: "Sem API Key",
    changeKey: "Alterar Chave",
    configureApi: "Configurar API",
    apiModalTitle: "CONFIGURAÇÕES DE API",
    apiModalSub: "Selecione o provedor para gerar imagens",
    apiKeyLabel: "CHAVE DE API",
    saveKey: "Salvar Chave de API",
    savedKey: "✓ Salvo!",
    remove: "Remover",
    geminiInstructions: <>Acesse <span style={{color:"#ff0000",fontWeight:700}}>aistudio.google.com</span> → "Get API Key" → "Create API Key". Sem cartão de crédito.</>,
    hfInstructions: <>Cadastre-se em <span style={{color:"#ff0000",fontWeight:700}}>huggingface.co</span> → Settings → Access Tokens → New Token (Read). Grátis.</>,
    previewLive: "PRÉVIA AO VIVO — ",
    previewHint: "ATUALIZA EM TEMPO REAL · GERE O BLUEPRINT PARA DETALHES",
    fillNiche: "PREENCHA O NICHO PARA VISUALIZAR",
    formatLabel: "FORMATO",
    layerPlaceholder: (n) => `Texto da camada ${n}...`,
    layerLabel: "CAMADA",
    horizontal: "HORIZONTAL",
    vertical: "VERTICAL",
    footerLabel: "BLUEPRINT V4.1 FINAL",
    gendersMap: { Man:"Homem", Woman:"Mulher", "Any / None":"Qualquer / Nenhum" },
    lifeStagesMap: { Child:"Criança", Young:"Jovem", Adult:"Adulto", Old:"Idoso", "Any / None":"Qualquer / Nenhum" },
    expressionsMap: { Shocked:"Chocado", Curious:"Curioso", Happy:"Feliz", Fear:"Medo", Angry:"Raiva", Confident:"Confiante", Mysterious:"Misterioso", Laughing:"Rindo" },
  },
  es: {
    logoSub: "ARQUITECTO V4.1",
    apiSettings: "CONFIG. API",
    nicheLabel: "NICHO / TEMA",
    nichePlaceholder: "ej: Cómo Ganar $10k al Mes...",
    dimensionsLabel: "DIMENSIONES",
    characterLabel: "AJUSTES DE PERSONAJE",
    withCharacter: "Con Personaje",
    noCharacter: "Sin Personaje",
    gender: "GÉNERO",
    lifeStage: "ETAPA DE VIDA",
    skinTone: "TONO DE PIEL",
    expression: "EXPRESIÓN",
    visualStyle: "ESTILO VISUAL",
    extraDetails: "DETALLES EXTRA",
    extraPlaceholder: "Accesorios, elementos de fondo, efectos especiales...",
    generateBtn: "▶ GENERAR BLUEPRINT",
    generating: "GENERANDO...",
    tabPreview: "Vista previa",
    tabBlueprint: "Blueprint",
    tabImage: "Imagen",
    livePreview: "VISTA PREVIA EN VIVO",
    blueprintResult: "RESULTADO DEL BLUEPRINT",
    generatedImage: "IMAGEN GENERADA",
    copyBlueprint: "⧉ Copiar Blueprint",
    copied: "✓ ¡Copiado!",
    generateImage: "🖼 Generar Imagen",
    generatingImg: "Generando...",
    download: "⬇ Descargar",
    generateBlueprintShort: "▶ Generar Blueprint",
    generatingShort: "Generando...",
    noBlueprintTitle: "Sin blueprint aún",
    noBlueprintSub: "Rellena la barra lateral y haz clic en Generar Blueprint",
    craftingBlueprint: "Creando tu blueprint...",
    generatingThumbnail: "Generando imagen de miniatura...",
    noApiKey: "Configura tu API Key en CONFIG. API",
    generateFirst: "Genera un blueprint primero, luego haz clic en Generar Imagen",
    placementLabel: "POSICIÓN",
    textLayers: "CAPAS DE TEXTO",
    apiStatus: "ESTADO DE API",
    geminiConnected: "Gemini Conectado",
    hfConnected: "HuggingFace Conectado",
    noKey: "Sin API Key",
    changeKey: "Cambiar Clave",
    configureApi: "Configurar API",
    apiModalTitle: "CONFIGURACIÓN DE API",
    apiModalSub: "Selecciona el proveedor para generar imágenes",
    apiKeyLabel: "CLAVE DE API",
    saveKey: "Guardar Clave de API",
    savedKey: "✓ ¡Guardado!",
    remove: "Eliminar",
    geminiInstructions: <>Ve a <span style={{color:"#ff0000",fontWeight:700}}>aistudio.google.com</span> → "Get API Key" → "Create API Key". Sin tarjeta de crédito.</>,
    hfInstructions: <>Regístrate en <span style={{color:"#ff0000",fontWeight:700}}>huggingface.co</span> → Settings → Access Tokens → New Token (Read). Gratis.</>,
    previewLive: "VISTA PREVIA EN VIVO — ",
    previewHint: "SE ACTUALIZA EN TIEMPO REAL · GENERA EL BLUEPRINT PARA DETALLES",
    fillNiche: "COMPLETA EL NICHO PARA VISUALIZAR",
    formatLabel: "FORMATO",
    layerPlaceholder: (n) => `Texto de capa ${n}...`,
    layerLabel: "CAPA",
    horizontal: "HORIZONTAL",
    vertical: "VERTICAL",
    footerLabel: "BLUEPRINT V4.1 FINAL",
    gendersMap: { Man:"Hombre", Woman:"Mujer", "Any / None":"Cualquiera / Ninguno" },
    lifeStagesMap: { Child:"Niño", Young:"Joven", Adult:"Adulto", Old:"Mayor", "Any / None":"Cualquiera / Ninguno" },
    expressionsMap: { Shocked:"Sorprendido", Curious:"Curioso", Happy:"Feliz", Fear:"Miedo", Angry:"Enojado", Confident:"Seguro", Mysterious:"Misterioso", Laughing:"Riendo" },
  },
};

// ─── Color tokens ─────────────────────────────────────────────────────────────
// bg:   #0f0f0f  (near-black, YouTube dark)
// card: #181818
// border: #2a2a2a
// red:  #ff0000
// red2: #cc0000
// white:#ffffff
// muted:#888888

export default function ThumbStudio() {
  const [lang,        setLang]        = useState("pt");
  const [niche,       setNiche]       = useState("");
  const [dimension,   setDimension]   = useState("youtube");
  const [gender,      setGender]      = useState("Woman");
  const [lifeStage,   setLifeStage]   = useState("Young");
  const [skinTone,    setSkinTone]    = useState("any");
  const [visualStyle, setVisualStyle] = useState("Cinematic");
  const [expression,  setExpression]  = useState("Shocked");
  const [hasCharacter,setHasCharacter]= useState(true);
  const [extraDetails,setExtraDetails]= useState("");

  const [placement,   setPlacement]   = useState("mid-left");
  const [orientation, setOrientation] = useState("horizontal");
  const [textLayers,  setTextLayers]  = useState([{ id:1, text:"" }]);
  const [activeLayer, setActiveLayer] = useState(1);

  const [blueprint,   setBlueprint]   = useState("");
  const [isLoading,   setIsLoading]   = useState(false);
  const [copied,      setCopied]      = useState(false);

  const [apiKey,      setApiKey]      = useState("");
  const [apiProvider, setApiProvider] = useState("gemini");
  const [showApiModal,setShowApiModal]= useState(false);
  const [savedApi,    setSavedApi]    = useState(false);

  const [generatedImage,    setGeneratedImage]    = useState(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imageError,        setImageError]        = useState("");
  const [activeTab,         setActiveTab]         = useState("preview");

  useEffect(() => {
    const k = localStorage.getItem("ts2_api_key");
    const p = localStorage.getItem("ts2_api_provider");
    if (k) setApiKey(k);
    if (p) setApiProvider(p);
  }, []);

  // ─── Layer helpers ───────────────────────────────────────────────────────────
  function addLayer() {
    if (textLayers.length >= 5) return;
    const newId = Math.max(...textLayers.map(l => l.id)) + 1;
    setTextLayers([...textLayers, { id:newId, text:"" }]);
    setActiveLayer(newId);
  }
  function removeLayer(id) {
    if (textLayers.length <= 1) return;
    const remaining = textLayers.filter(l => l.id !== id);
    setTextLayers(remaining);
    if (activeLayer === id) setActiveLayer(remaining[0].id);
  }
  function updateLayerText(id, text) {
    setTextLayers(textLayers.map(l => l.id === id ? { ...l, text } : l));
  }

  function saveApiKey() {
    localStorage.setItem("ts2_api_key", apiKey);
    localStorage.setItem("ts2_api_provider", apiProvider);
    setSavedApi(true);
    setTimeout(() => { setSavedApi(false); setShowApiModal(false); }, 1200);
  }
  function copyBlueprint() {
    navigator.clipboard.writeText(blueprint);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const t = T[lang] || T.pt;

  const dimInfo = DIMENSIONS.find(d => d.id === dimension);
  const layers  = textLayers.filter(l => l.text.trim());

  // ─── Generate blueprint ──────────────────────────────────────────────────────
  async function generateBlueprint() {
    if (!niche.trim()) return;
    setIsLoading(true);
    setBlueprint("");
    setGeneratedImage(null);
    setImageError("");
    setActiveTab("blueprint");

    const layerInstructions = layers.length > 0
      ? layers.map((l,i) => `- Text Layer ${i+1}: "${l.text}" | Position: ${PLACEMENT_LABEL[placement]} | Orientation: ${orientation}`).join("\n")
      : "No text overlay";

    const systemPrompt =
      lang === "pt" ? "Você é um especialista em criar blueprints detalhados para thumbnails do YouTube de alta conversão. Responda em português."
      : lang === "es" ? "Eres un experto en crear blueprints detallados para miniaturas de YouTube de alta conversión. Responde en español."
      : "You are an expert in creating detailed blueprints for high-converting YouTube thumbnails. Respond in English.";

    const userMsg = `Create a detailed thumbnail BLUEPRINT for:

**Niche / Topic:** ${niche}
**Format:** ${dimInfo?.label} (${dimInfo?.sub})
**Visual Style:** ${visualStyle}
${hasCharacter ? `**Character:** Gender: ${gender} | Life Stage: ${lifeStage} | Skin: ${skinTone} | Expression: ${expression}` : "**Character:** None"}
**Text Layers:**
${layerInstructions}
**Extra Details:** ${extraDetails || "none"}

Structure with these exact sections:

**🎯 Visual Composition**
[Full scene, character placement, background, lighting, atmosphere, depth of field]

**🎨 Color & Mood**
[Color palette, dominant/accent colors, overall mood]

**✨ Special Effects & Elements**
[Floating elements, overlays, textures, particles, VFX]

**📝 Typography Architecture**
[For each text layer: position, font style, size, color, effects, 3D treatment]

**🖼️ Composition Rules**
[Rule of thirds, focal points, eye-flow, negative space]

**⚡ Click-Bait Factors**
[Why this is irresistible to click. Psychological triggers used]

End with: BLUEPRINT V4.1 FINAL | ${dimInfo?.sub} FORMAT`;

    try {
      const geminiKey = localStorage.getItem("ts2_api_key") || "";
      if (!geminiKey) { setBlueprint("⚠️ Configure sua Gemini API Key em API SETTINGS."); setIsLoading(false); return; }
      const fullPrompt = systemPrompt + "\n\n" + userMsg;
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: fullPrompt }] }] })
        }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      const text = data.candidates?.[0]?.content?.parts?.map(p => p.text||"").join("") || "";
      setBlueprint(text.trim());
    } catch(e) {
      setBlueprint("Erro ao gerar blueprint: " + (e.message || "tente novamente."));
    }
    setIsLoading(false);
  }

  // ─── Generate image ──────────────────────────────────────────────────────────
  async function generateImage() {
    if (!blueprint) return;
    if (!apiKey) { setImageError(t.noApiKey); return; }
    setIsGeneratingImage(true);
    setGeneratedImage(null);
    setImageError("");
    setActiveTab("image");

    const prompt = `Professional YouTube thumbnail, ${niche}, ${visualStyle} style, ${dimInfo?.label} format, 8k uhd, photorealistic, eye-catching, ${expression||"dynamic"} expression${hasCharacter?`, ${gender}, ${lifeStage}`:""}, ${extraDetails||"vibrant colors"}, highly detailed, cinematic lighting, highly clickable`;

    try {
      if (apiProvider === "gemini") {
        const res  = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${apiKey}`,{
          method:"POST", headers:{ "Content-Type":"application/json" },
          body: JSON.stringify({ contents:[{ parts:[{ text:prompt }] }], generationConfig:{ responseModalities:["IMAGE","TEXT"] } })
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error.message);
        const imgPart = data.candidates?.[0]?.content?.parts?.find(p => p.inlineData?.mimeType?.startsWith("image/"));
        if (imgPart) setGeneratedImage(`data:${imgPart.inlineData.mimeType};base64,${imgPart.inlineData.data}`);
        else throw new Error("No image returned.");
      } else {
        const res = await fetch("https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",{
          method:"POST",
          headers:{ "Authorization":`Bearer ${apiKey}`, "Content-Type":"application/json" },
          body: JSON.stringify({ inputs:prompt })
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setGeneratedImage(URL.createObjectURL(await res.blob()));
      }
    } catch(e) { setImageError(e.message||"Error generating image."); }
    setIsGeneratingImage(false);
  }

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={S.root}>
      <style>{CSS}</style>

      {/* ══ TOP BAR ══ */}
      <div style={S.topbar}>
        {/* Logo */}
        <div style={S.logo}>
          <div style={S.logoIcon}>
            {/* YouTube-style play triangle */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect width="20" height="20" rx="4" fill="#ff0000"/>
              <polygon points="7,5 16,10 7,15" fill="white"/>
            </svg>
          </div>
          <div>
            <div style={S.logoName}>ThumbStudio</div>
            <div style={S.logoSub}>{t.logoSub}</div>
          </div>
        </div>

        {/* Lang */}
        <div style={{ display:"flex", gap:4 }}>
          {LANGUAGES.map(l => (
            <button key={l.id} className={`lang-btn ${lang===l.id?"active":""}`} onClick={() => setLang(l.id)}>
              <span style={{ fontSize:12 }}>{l.flag}</span> {l.label}
            </button>
          ))}
        </div>

        {/* API btn */}
        <button className="api-btn" onClick={() => setShowApiModal(true)}>
          <span>⚙</span> {t.apiSettings}
        </button>
      </div>

      {/* ══ MAIN 3-COLUMN ══ */}
      <div style={S.main}>

        {/* ── LEFT SIDEBAR ── */}
        <div style={S.sidebar}>
          <div style={S.sideScroll}>

            <SideSection label={t.nicheLabel}>
              <textarea className="ts-input" rows={3} placeholder={t.nichePlaceholder}
                value={niche} onChange={e => setNiche(e.target.value)} />
            </SideSection>

            <SideSection label={t.dimensionsLabel}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
                {DIMENSIONS.map(d => (
                  <button key={d.id} className={`dim-btn ${dimension===d.id?"active":""}`} onClick={() => setDimension(d.id)}>
                    <span style={{ fontSize:15 }}>{d.icon}</span>
                    <div>
                      <div style={{ fontWeight:700, fontSize:10, letterSpacing:0.5 }}>{d.label.toUpperCase()}</div>
                      <div style={{ fontSize:10, opacity:0.5 }}>{d.sub}</div>
                    </div>
                  </button>
                ))}
              </div>
            </SideSection>

            <SideSection label={t.characterLabel}>
              <div style={{ display:"flex", gap:6, marginBottom:10 }}>
                <button className={`tog-btn ${hasCharacter?"active":""}`}  onClick={() => setHasCharacter(true)}  style={{ flex:1 }}>{t.withCharacter}</button>
                <button className={`tog-btn ${!hasCharacter?"active":""}`} onClick={() => setHasCharacter(false)} style={{ flex:1 }}>{t.noCharacter}</button>
              </div>
              {hasCharacter && <>
                <SideLabel>{t.gender}</SideLabel>
                <div style={{ display:"flex", gap:6, marginBottom:10 }}>
                  {GENDERS.map(g => (
                    <button key={g} className={`chip-btn ${gender===g?"active":""}`} onClick={() => setGender(g)} style={{ flex:1, fontSize:11 }}>{t.gendersMap[g]||g}</button>
                  ))}
                </div>
                <SideLabel>{t.lifeStage}</SideLabel>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:6, marginBottom:10 }}>
                  {LIFE_STAGES.map(s => (
                    <button key={s} className={`chip-btn ${lifeStage===s?"active":""}`} onClick={() => setLifeStage(s)} style={{ fontSize:11 }}>{t.lifeStagesMap[s]||s}</button>
                  ))}
                </div>
                <SideLabel>{t.skinTone}</SideLabel>
                <div style={{ display:"flex", gap:8, marginBottom:10 }}>
                  {SKIN_TONES.map(st => (
                    <button key={st.id} onClick={() => setSkinTone(st.id)}
                      className={`skin-btn ${skinTone===st.id?"active":""}`}
                      style={{ background: st.color }} />
                  ))}
                </div>
                <SideLabel>{t.expression}</SideLabel>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginBottom:10 }}>
                  {EXPRESSIONS.map(e => (
                    <button key={e} className={`chip-btn ${expression===e?"active":""}`} onClick={() => setExpression(e)} style={{ fontSize:11 }}>{t.expressionsMap[e]||e}</button>
                  ))}
                </div>
              </>}
            </SideSection>

            <SideSection label={t.visualStyle}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
                {VISUAL_STYLES.map(s => (
                  <button key={s} className={`chip-btn ${visualStyle===s?"active":""}`} onClick={() => setVisualStyle(s)} style={{ fontSize:11 }}>{s}</button>
                ))}
              </div>
            </SideSection>

            <SideSection label={t.extraDetails}>
              <textarea className="ts-input" rows={3} placeholder={t.extraPlaceholder}
                value={extraDetails} onChange={e => setExtraDetails(e.target.value)} />
            </SideSection>

            <button className="gen-btn" onClick={generateBlueprint} disabled={isLoading||!niche.trim()}>
              {isLoading ? <><span className="spinner"/> {t.generating}</> : t.generateBtn}
            </button>
          </div>
        </div>

        {/* ── CENTER ── */}
        <div style={S.center}>
          <div style={S.centerCard}>

            {/* header */}
            <div style={S.cardHeader}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ color:"#ff0000", fontSize:16 }}>
                  {activeTab==="preview" ? "🎬" : activeTab==="blueprint" ? "📋" : "🖼"}
                </span>
                <span style={S.cardTitle}>
                  {activeTab==="preview" ? t.livePreview : activeTab==="blueprint" ? t.blueprintResult : t.generatedImage}
                </span>
                <div style={{ display:"flex", gap:4, marginLeft:8 }}>
                  <button className={`tab-pill ${activeTab==="preview"?"active":""}`}   onClick={() => setActiveTab("preview")}>{t.tabPreview}</button>
                  <button className={`tab-pill ${activeTab==="blueprint"?"active":""}`} onClick={() => setActiveTab("blueprint")}>{t.tabBlueprint}</button>
                  <button className={`tab-pill ${activeTab==="image"?"active":""}`}     onClick={() => setActiveTab("image")}>{t.tabImage}</button>
                </div>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                {activeTab==="blueprint" && blueprint && <>
                  <button className="copy-btn" onClick={copyBlueprint}>{copied ? t.copied : t.copyBlueprint}</button>
                  <button className="copy-btn red-btn" onClick={generateImage} disabled={isGeneratingImage||!apiKey}>
                    {isGeneratingImage ? <><span className="spinner"/>{t.generatingImg}</> : t.generateImage}
                  </button>
                </>}
                {activeTab==="image" && generatedImage && (
                  <button className="copy-btn" onClick={() => { const a=document.createElement("a"); a.href=generatedImage; a.download="thumbnail.png"; a.click(); }}>{t.download}</button>
                )}
                {activeTab==="preview" && (
                  <button className="copy-btn" onClick={generateBlueprint} disabled={isLoading||!niche.trim()}>
                    {isLoading ? <><span className="spinner"/>{t.generatingShort}</> : t.generateBlueprintShort}
                  </button>
                )}
              </div>
            </div>

            {/* body */}
            <div style={S.cardBody}>
              {activeTab==="preview" && (
                <ThumbnailPreview
                  niche={niche}
                  dimension={dimension}
                  visualStyle={visualStyle}
                  hasCharacter={hasCharacter}
                  gender={gender}
                  lifeStage={lifeStage}
                  skinTone={skinTone}
                  expression={expression}
                  textLayers={textLayers}
                  placement={placement}
                  orientation={orientation}
                  generatedImage={generatedImage}
                  t={t}
                />
              )}

              {activeTab==="blueprint" && (
                <>
                  {!blueprint && !isLoading && (
                    <div style={S.empty}>
                      <div style={{ fontSize:52, marginBottom:14, opacity:0.15 }}>▶</div>
                      <div style={{ fontSize:15, fontWeight:700, color:"#ddd", marginBottom:6 }}>{t.noBlueprintTitle}</div>
                      <div style={{ fontSize:13, color:"#555" }}>{t.noBlueprintSub}</div>
                    </div>
                  )}
                  {isLoading && (
                    <div style={S.empty}>
                      <div style={{ width:44, height:44, border:"3px solid #ff000022", borderTopColor:"#ff0000", borderRadius:"50%", animation:"spin .8s linear infinite", marginBottom:18 }}/>
                      <div style={{ fontSize:13, color:"#888" }}>{t.craftingBlueprint}</div>
                    </div>
                  )}
                  {blueprint && !isLoading && (
                    <div style={S.blueprintText}>
                      {blueprint.split("\n").map((line, i) => {
                        const cleaned = line.replace(/\*\*/g,"");
                        const isHeader = line.startsWith("**") && !line.trim().startsWith("* ") && !line.trim().startsWith("- ");
                        const isBullet = /^[\*\-]\s/.test(line.trim()) && !isHeader;
                        if (!line.trim()) return <div key={i} style={{ height:10 }}/>;
                        if (isHeader) return (
                          <div key={i} style={{ color:"#ff0000", fontWeight:800, fontSize:13, marginTop:20, marginBottom:7, letterSpacing:0.4, display:"flex", alignItems:"center", gap:8 }}>
                            {cleaned}
                          </div>
                        );
                        if (isBullet) return (
                          <div key={i} style={{ paddingLeft:14, color:"#aaa", fontSize:13, lineHeight:1.75, borderLeft:"2px solid #ff000055", marginLeft:6, marginBottom:4 }}>
                            {cleaned.replace(/^[\*\-]\s*/,"")}
                          </div>
                        );
                        return <div key={i} style={{ color:"#ccc", fontSize:13, lineHeight:1.85 }}>{cleaned}</div>;
                      })}
                    </div>
                  )}
                </>
              )}

              {activeTab==="image" && (
                <>
                  {!generatedImage && !isGeneratingImage && !imageError && (
                    <div style={S.empty}>
                      <div style={{ fontSize:48, marginBottom:14, opacity:0.2 }}>🖼</div>
                      <div style={{ fontSize:13, color:"#444" }}>
                        {!apiKey ? t.noApiKey : t.generateFirst}
                      </div>
                    </div>
                  )}
                  {isGeneratingImage && (
                    <div style={S.empty}>
                      <div style={{ width:44, height:44, border:"3px solid #ff000022", borderTopColor:"#ff0000", borderRadius:"50%", animation:"spin .8s linear infinite", marginBottom:18 }}/>
                      <div style={{ fontSize:13, color:"#888" }}>{t.generatingThumbnail}</div>
                    </div>
                  )}
                  {imageError && !isGeneratingImage && (
                    <div style={S.empty}>
                      <div style={{ padding:"14px 22px", background:"#fff0f0", border:"1px solid #ffaaaa", borderRadius:10, color:"#cc0000", fontSize:13 }}>⚠ {imageError}</div>
                    </div>
                  )}
                  {generatedImage && !isGeneratingImage && (
                    <div style={{ padding:20 }}>
                      <img src={generatedImage} alt="Generated thumbnail" style={{ width:"100%", borderRadius:10, border:"1px solid #e8e8e8", display:"block", boxShadow:"0 8px 32px #0001" }}/>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* footer */}
            {blueprint && (
              <div style={S.cardFooter}>
                <span style={{ color:"#bbb", fontSize:11, fontFamily:"monospace" }}>{t.footerLabel}</span>
                <span style={{ color:"#bbb", fontSize:11, fontFamily:"monospace" }}>{dimInfo?.sub} {t.formatLabel}</span>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <div style={S.rightSidebar}>

          {/* Placement */}
          <div style={S.rightSection}>
            <div style={S.rsHeader}><span style={{ color:"#ff0000", fontSize:9 }}>●</span> {t.placementLabel}</div>
            <div style={S.pgrid}>
              {PLACEMENT_GRID.map(row => row.map(cell => (
                <button key={cell} className={`place-btn ${placement===cell?"active":""}`} onClick={() => setPlacement(cell)}>
                  <span style={{ width:6, height:6, borderRadius:"50%", background:placement===cell?"#ff0000":"#ddd", display:"block" }}/>
                </button>
              )))}
            </div>
            <div style={S.plabel}>{PLACEMENT_LABEL[placement]}</div>
            <div style={{ display:"flex", gap:8, marginTop:14 }}>
              <button className={`orient-btn ${orientation==="horizontal"?"active":""}`} onClick={() => setOrientation("horizontal")} style={{ flex:1 }}>
                <span style={{ fontSize:15 }}>↔</span>
                <div style={{ fontSize:10, marginTop:2 }}>{t.horizontal}</div>
              </button>
              <button className={`orient-btn ${orientation==="vertical"?"active":""}`} onClick={() => setOrientation("vertical")} style={{ flex:1 }}>
                <span style={{ fontSize:15 }}>↕</span>
                <div style={{ fontSize:10, marginTop:2 }}>{t.vertical}</div>
              </button>
            </div>
          </div>

          {/* Text Layers */}
          <div style={S.rightSection}>
            <div style={S.rsHeader}>
              <span style={{ color:"#ff0000", fontSize:9 }}>●</span> {t.textLayers} ({textLayers.length}/5)
              <button className="add-layer-btn" onClick={addLayer} disabled={textLayers.length>=5}>+</button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {textLayers.map((layer, idx) => (
                <div key={layer.id} className={`layer-card ${activeLayer===layer.id?"active":""}`} onClick={() => setActiveLayer(layer.id)}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
                    <div style={{ fontSize:11, fontWeight:700, color:activeLayer===layer.id?"#ff0000":"#aaa" }}>● {t.layerLabel} {idx+1}</div>
                    {textLayers.length>1 && (
                      <button onClick={e => { e.stopPropagation(); removeLayer(layer.id); }}
                        style={{ background:"none", border:"none", color:"#ccc", cursor:"pointer", fontSize:13, padding:"0 2px" }}>✕</button>
                    )}
                  </div>
                  <input className="layer-input" placeholder={t.layerPlaceholder(idx+1)}
                    value={layer.text}
                    onClick={e => e.stopPropagation()}
                    onChange={e => updateLayerText(layer.id, e.target.value)} />
                  {activeLayer===layer.id && (
                    <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}>
                      <span style={{ fontSize:10, color:"#bbb" }}>{PLACEMENT_LABEL[placement]}</span>
                      <span style={{ fontSize:10, color:"#bbb" }}>{orientation.toUpperCase()}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* API status */}
          <div style={{ padding:"12px 14px", margin:"8px", background:"#141414", border:"1px solid #2a2a2a", borderRadius:8 }}>
            <div style={{ fontSize:10, color:"#444", fontWeight:700, letterSpacing:1, marginBottom:8 }}>{t.apiStatus}</div>
            <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:11, color: apiKey?"#22aa44":"#cc4400" }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:apiKey?"#22aa44":"#cc4400", display:"block" }}/>
              {apiKey ? (apiProvider==="gemini" ? t.geminiConnected : t.hfConnected) : t.noKey}
            </div>
            <button onClick={() => setShowApiModal(true)}
              style={{ marginTop:8, width:"100%", padding:"6px", background:"#1e1e1e", border:"1px solid #333", borderRadius:5, color:"#666", fontSize:10, cursor:"pointer", fontFamily:"inherit" }}>
              {apiKey ? t.changeKey : t.configureApi}
            </button>
          </div>

        </div>
      </div>

      {/* ══ API MODAL ══ */}
      {showApiModal && (
        <div style={S.overlay} onClick={() => setShowApiModal(false)}>
          <div style={S.modal} onClick={e => e.stopPropagation()}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <div style={{ fontSize:15, fontWeight:800, letterSpacing:1, color:"#eee" }}>{t.apiModalTitle}</div>
              <button onClick={() => setShowApiModal(false)} style={{ background:"none", border:"none", color:"#555", fontSize:20, cursor:"pointer" }}>✕</button>
            </div>

            <div style={{ fontSize:12, color:"#666", marginBottom:16 }}>{t.apiModalSub}</div>

            <div style={{ display:"flex", gap:10, marginBottom:20 }}>
              {[
                { id:"gemini",      emoji:"🔵", label:"Google Gemini",  sub:"500 imgs/day free" },
                { id:"huggingface", emoji:"🤗", label:"Hugging Face",   sub:"FLUX.1 Schnell free" },
              ].map(p => (
                <button key={p.id} className={`provider-card ${apiProvider===p.id?"active":""}`} onClick={() => setApiProvider(p.id)}>
                  <div style={{ fontSize:22, marginBottom:8 }}>{p.emoji}</div>
                  <div style={{ fontWeight:700, fontSize:13 }}>{p.label}</div>
                  <div style={{ fontSize:11, opacity:0.7, marginTop:4 }}>{p.sub}</div>
                </button>
              ))}
            </div>

            <div style={{ padding:"12px 14px", background:"#141414", border:"1px solid #2a2a2a", borderRadius:8, marginBottom:16, fontSize:12, color:"#777", lineHeight:1.8 }}>
              {apiProvider==="gemini" ? t.geminiInstructions : t.hfInstructions}
            </div>

            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:11, color:"#555", fontWeight:700, marginBottom:8, letterSpacing:1 }}>{t.apiKeyLabel}</div>
              <input className="ts-input" type="password"
                placeholder={apiProvider==="gemini"?"AIza...":"hf_..."}
                value={apiKey} onChange={e => setApiKey(e.target.value)} />
            </div>

            <div style={{ display:"flex", gap:10 }}>
              <button className="gen-btn" style={{ flex:1, padding:"12px" }} onClick={saveApiKey} disabled={!apiKey}>
                {savedApi ? t.savedKey : t.saveKey}
              </button>
              {apiKey && (
                <button className="copy-btn" style={{ color:"#cc0000", borderColor:"#ffaaaa" }}
                  onClick={() => { setApiKey(""); localStorage.removeItem("ts2_api_key"); }}>
                  {t.remove}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Thumbnail Preview Component ─────────────────────────────────────────────
const STYLE_THEMES = {
  "Hyper Realistic":   { bg:"linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)", grain:true,  glow:"#4fc3f7" },
  "Cinematic":         { bg:"linear-gradient(160deg,#0d0d0d 0%,#1a0a00 60%,#2d1000 100%)", grain:true,  glow:"#ff6b00" },
  "3D Render":         { bg:"linear-gradient(135deg,#0a0a0a 0%,#1a1a3e 50%,#0a0a1a 100%)", grain:false, glow:"#a78bfa" },
  "Cartoon / Anime":   { bg:"linear-gradient(135deg,#fff9e6 0%,#ffe0b2 50%,#ffccbc 100%)", grain:false, glow:"#ff7043" },
  "Dark / Moody":      { bg:"linear-gradient(160deg,#050505 0%,#0d0d0d 100%)",             grain:true,  glow:"#b71c1c" },
  "Vibrant / Colorful":{ bg:"linear-gradient(135deg,#6a1b9a 0%,#1565c0 50%,#00838f 100%)",grain:false, glow:"#ffeb3b" },
  "Minimalist":        { bg:"linear-gradient(160deg,#fafafa 0%,#f0f0f0 100%)",             grain:false, glow:"#222" },
  "Retro 80s":         { bg:"linear-gradient(160deg,#1a0033 0%,#33006f 50%,#00d4ff22 100%)",grain:false,glow:"#ff00ff" },
  "Comic / HQ":        { bg:"linear-gradient(135deg,#fffde7 0%,#fff9c4 100%)",             grain:false, glow:"#f44336" },
  "Watercolor":        { bg:"linear-gradient(135deg,#e8f5e9 0%,#e3f2fd 50%,#fce4ec 100%)",grain:false, glow:"#ec407a" },
};

const PLACEMENT_FLEX = {
  "top-left":    { justifyContent:"flex-start", alignItems:"flex-start" },
  "top-center":  { justifyContent:"center",     alignItems:"flex-start" },
  "top-right":   { justifyContent:"flex-end",   alignItems:"flex-start" },
  "mid-left":    { justifyContent:"flex-start", alignItems:"center"     },
  "center":      { justifyContent:"center",     alignItems:"center"     },
  "mid-right":   { justifyContent:"flex-end",   alignItems:"center"     },
  "bot-left":    { justifyContent:"flex-start", alignItems:"flex-end"   },
  "bot-center":  { justifyContent:"center",     alignItems:"flex-end"   },
  "bot-right":   { justifyContent:"flex-end",   alignItems:"flex-end"   },
};

const DIM_ASPECT = { youtube:"56.25%", story:"177.77%", square:"100%", portrait:"133.33%", landscape:"56.25%" };

const EXPRESSION_EMOJI = { Shocked:"😱", Curious:"🤔", Happy:"😄", Fear:"😰", Angry:"😠", Confident:"😎", Mysterious:"🕵️", Laughing:"😂" };

function ThumbnailPreview({ niche, dimension, visualStyle, hasCharacter, gender, lifeStage, skinTone, expression, textLayers, placement, orientation, generatedImage, t }) {
  const theme = STYLE_THEMES[visualStyle] || STYLE_THEMES["Cinematic"];
  const aspect = DIM_ASPECT[dimension] || "56.25%";
  const activeLayers = textLayers.filter(l => l.text.trim());
  const isLight = ["Cartoon / Anime","Minimalist","Comic / HQ","Watercolor"].includes(visualStyle);
  const textColor = isLight ? "#111" : "#fff";
  const placeFlex = PLACEMENT_FLEX[placement] || PLACEMENT_FLEX["mid-left"];

  const skinColors = { light:"#f5cba7", "medium-light":"#d4956a", medium:"#b07040", "medium-dark":"#8b5a2b", dark:"#3a1a05", any:"#c4956a" };
  const skinColor = skinColors[skinTone] || skinColors.any;

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", padding:"28px 20px", background:"#111", minHeight:300 }}>
      {/* Label */}
      <div style={{ fontSize:10, fontWeight:700, letterSpacing:2, color:"#555", marginBottom:14, fontFamily:"monospace" }}>{t.previewLive}{dimension?.toUpperCase()}</div>

      {/* Canvas */}
      <div style={{ position:"relative", width:"100%", maxWidth: dimension==="story"||dimension==="portrait" ? 260 : "100%", maxHeight:"calc(100% - 80px)" }}>
        <div style={{ position:"relative", width:"100%", paddingTop: aspect, overflow:"hidden", borderRadius:10,
          background: generatedImage ? "none" : theme.bg,
          boxShadow:`0 0 0 1px #ffffff11, 0 8px 48px ${theme.glow}44, 0 2px 8px #00000066`,
        }}>

          {/* Generated image bg */}
          {generatedImage && (
            <img src={generatedImage} alt="thumbnail" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />
          )}

          {/* Grain overlay */}
          {theme.grain && !generatedImage && (
            <div style={{ position:"absolute", inset:0, backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`, opacity:0.4, mixBlendMode:"overlay", pointerEvents:"none", zIndex:1 }}/>
          )}

          {/* Glow orb */}
          {!generatedImage && (
            <div style={{ position:"absolute", width:"55%", height:"55%", borderRadius:"50%",
              background:`radial-gradient(circle, ${theme.glow}33 0%, transparent 70%)`,
              top:"20%", left:"20%", zIndex:1, filter:"blur(20px)" }}/>
          )}

          {/* Character silhouette */}
          {hasCharacter && !generatedImage && (
            <div style={{ position:"absolute", bottom:0, right: placement.includes("left") ? "auto" : 0,
              left: placement.includes("left") ? "auto" : "auto",
              right: placement.includes("right") || placement==="center" ? 0 : "auto",
              left: placement.includes("left") ? 0 : "auto",
              height:"90%", aspectRatio:"0.55", zIndex:2, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-end"
            }}>
              {/* Head */}
              <div style={{ width:"38%", height:"19%", borderRadius:"50% 50% 45% 45%", background:skinColor, marginBottom:"-2%", position:"relative", zIndex:1, boxShadow:`0 0 16px ${theme.glow}55`,
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:"clamp(10px,4cqw,22px)" }}>
                {EXPRESSION_EMOJI[expression]||"😮"}
              </div>
              {/* Body */}
              <div style={{ width:"55%", height:"52%", borderRadius:"12px 12px 0 0",
                background:`linear-gradient(180deg, ${skinColor}dd 0%, ${skinColor}99 100%)`,
                boxShadow:`0 0 24px ${theme.glow}33` }}/>
            </div>
          )}

          {/* No-character icon */}
          {!hasCharacter && !generatedImage && (
            <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", zIndex:2 }}>
              <div style={{ fontSize:"clamp(28px,8cqw,56px)", opacity:0.15 }}>🎬</div>
            </div>
          )}

          {/* Niche watermark */}
          {!niche.trim() && !generatedImage && (
            <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", zIndex:3 }}>
              <div style={{ fontSize:10, color:"#ffffff33", fontFamily:"monospace", letterSpacing:2 }}>{t.fillNiche}</div>
            </div>
          )}

          {/* Text Layers */}
          {activeLayers.length > 0 && (
            <div style={{ position:"absolute", inset:0, padding:"6%", display:"flex", flexDirection:"column",
              zIndex:5, ...placeFlex }}>
              <div style={{ display:"flex", flexDirection: orientation==="vertical" ? "column" : "row",
                gap: orientation==="vertical" ? "4%" : "3%",
                flexWrap:"wrap",
                maxWidth: orientation==="vertical" ? "58%" : "100%",
                alignItems: placeFlex.alignItems,
              }}>
                {activeLayers.map((layer, idx) => {
                  const isFirst = idx === 0;
                  return (
                    <div key={layer.id} style={{
                      fontFamily:"'DM Sans',system-ui,sans-serif",
                      fontWeight: isFirst ? 900 : 700,
                      fontSize: isFirst ? "clamp(10px,5cqw,26px)" : "clamp(8px,3.5cqw,18px)",
                      color: textColor,
                      lineHeight:1.1,
                      textTransform: isFirst ? "uppercase" : "none",
                      letterSpacing: isFirst ? "0.04em" : "0.01em",
                      textShadow: isLight ? "0 1px 4px #00000044" : `0 0 20px ${theme.glow}88, 0 2px 8px #000000cc`,
                      background: isFirst
                        ? `linear-gradient(135deg, ${isLight?"#111":"#fff"} 40%, ${theme.glow} 100%)`
                        : "none",
                      WebkitBackgroundClip: isFirst ? "text" : "unset",
                      WebkitTextFillColor: isFirst ? "transparent" : textColor,
                      filter: isFirst ? `drop-shadow(0 0 8px ${theme.glow}66)` : "none",
                      maxWidth:"100%",
                      wordBreak:"break-word",
                    }}>
                      {layer.text}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Style badge */}
          <div style={{ position:"absolute", top:"4%", left:"4%", zIndex:6,
            background:"#00000088", backdropFilter:"blur(4px)",
            border:`1px solid ${theme.glow}44`,
            borderRadius:4, padding:"2px 6px",
            fontSize:"clamp(6px,2cqw,10px)", fontWeight:700, color:theme.glow,
            fontFamily:"monospace", letterSpacing:1 }}>
            {visualStyle?.toUpperCase()}
          </div>

          {/* Corner accent */}
          <div style={{ position:"absolute", top:0, right:0, width:"25%", height:"25%", zIndex:1,
            background:`radial-gradient(circle at top right, ${theme.glow}22 0%, transparent 70%)` }}/>
        </div>
      </div>

      {/* Meta info strip */}
      <div style={{ display:"flex", gap:12, marginTop:14, alignItems:"center" }}>
        {[
          { icon:"📐", val: dimension === "youtube" ? "16:9" : dimension === "story" ? "9:16" : dimension === "square" ? "1:1" : dimension === "portrait" ? "3:4" : "16:9" },
          { icon:"🎨", val: visualStyle },
          hasCharacter && { icon:"👤", val: `${t.gendersMap[gender]||gender} · ${t.lifeStagesMap[lifeStage]||lifeStage}` },
          hasCharacter && { icon:"😮", val: t.expressionsMap[expression]||expression },
        ].filter(Boolean).map((item,i) => (
          <div key={i} style={{ fontSize:10, color:"#555", fontFamily:"monospace", display:"flex", alignItems:"center", gap:4 }}>
            <span>{item.icon}</span><span>{item.val}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop:10, fontSize:10, color:"#333", fontFamily:"monospace", letterSpacing:1 }}>
        {t.previewHint}
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function SideSection({ label, children }) {
  return (
    <div style={{ marginBottom:20 }}>
      <div style={{ fontSize:10, fontWeight:700, color:"#555", letterSpacing:1.5, marginBottom:10, fontFamily:"monospace" }}>{label}</div>
      {children}
    </div>
  );
}
function SideLabel({ children }) {
  return <div style={{ fontSize:10, color:"#444", fontWeight:700, letterSpacing:1, marginBottom:6, marginTop:10, fontFamily:"monospace" }}>{children}</div>;
}

// ─── Layout styles ────────────────────────────────────────────────────────────
const S = {
  root:{ fontFamily:"'DM Sans','Outfit',system-ui,sans-serif", background:"#111111", minHeight:"100vh", color:"#e0e0e0", display:"flex", flexDirection:"column", overflow:"hidden" },
  topbar:{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 20px", height:56, background:"#111111", borderBottom:"2px solid #ff0000", flexShrink:0, boxShadow:"0 2px 16px #ff000022" },
  logo:{ display:"flex", alignItems:"center", gap:12 },
  logoIcon:{ width:38, height:38, display:"flex", alignItems:"center", justifyContent:"center" },
  logoName:{ fontSize:18, fontWeight:800, letterSpacing:-0.5, color:"#ffffff", lineHeight:1.1 },
  logoSub:{ fontSize:10, color:"#ff0000", fontFamily:"monospace", letterSpacing:1.5 },
  main:{ display:"flex", flex:1, overflow:"hidden", height:"calc(100vh - 56px)" },
  sidebar:{ width:272, background:"#1a1a1a", borderRight:"1px solid #2e2e2e", flexShrink:0, overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:"2px 0 12px #00000033" },
  sideScroll:{ flex:1, overflowY:"auto", padding:"18px 16px 28px" },
  center:{ flex:1, padding:"18px", overflow:"hidden", display:"flex", flexDirection:"column", background:"#141414" },
  centerCard:{ flex:1, background:"#1e1e1e", border:"1px solid #2e2e2e", borderRadius:14, display:"flex", flexDirection:"column", overflow:"hidden", boxShadow:"0 4px 24px #00000044" },
  cardHeader:{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 20px", borderBottom:"1px solid #2a2a2a", flexShrink:0, background:"#181818" },
  cardTitle:{ fontSize:13, fontWeight:800, letterSpacing:1.5, color:"#eeeeee" },
  cardBody:{ flex:1, overflowY:"auto", position:"relative" },
  cardFooter:{ display:"flex", justifyContent:"space-between", padding:"10px 20px", borderTop:"1px solid #2a2a2a", background:"#181818" },
  empty:{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", minHeight:300 },
  blueprintText:{ padding:"20px 26px", lineHeight:1.8 },
  rightSidebar:{ width:220, background:"#1a1a1a", borderLeft:"1px solid #2e2e2e", flexShrink:0, overflowY:"auto", boxShadow:"-2px 0 12px #00000033" },
  rightSection:{ padding:"14px", borderBottom:"1px solid #262626" },
  rsHeader:{ display:"flex", alignItems:"center", gap:6, fontSize:10, fontWeight:700, color:"#555", letterSpacing:1.5, marginBottom:14, fontFamily:"monospace" },
  pgrid:{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:5, marginBottom:8 },
  plabel:{ textAlign:"center", fontSize:11, fontWeight:700, color:"#ff0000", letterSpacing:1, marginTop:8 },
  overlay:{ position:"fixed", inset:0, background:"#0005", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000 },
  modal:{ background:"#1e1e1e", border:"1px solid #333", borderRadius:14, padding:"26px", width:440, maxWidth:"92vw", boxShadow:"0 20px 60px #000008" },
};

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
* { box-sizing:border-box; margin:0; padding:0; }
::-webkit-scrollbar { width:3px; background:transparent; }
::-webkit-scrollbar-thumb { background:#333; border-radius:2px; }

.lang-btn {
  padding:5px 12px; border-radius:6px; border:1px solid #333;
  background:#222; color:#777; cursor:pointer; font-size:12px; font-weight:600;
  font-family:inherit; transition:all .15s; display:flex; align-items:center; gap:4px;
}
.lang-btn.active { background:#2a0000; border-color:#ff000066; color:#ff0000; }

.api-btn {
  padding:7px 16px; border-radius:8px; border:1px solid #333;
  background:#222; color:#777; cursor:pointer; font-size:12px; font-weight:600;
  font-family:inherit; transition:all .15s; display:flex; align-items:center; gap:6px;
}
.api-btn:hover { border-color:#ff0000; color:#ff0000; background:#2a0000; }

.ts-input {
  width:100%; background:#141414; border:1px solid #2e2e2e;
  color:#ddd; padding:10px 12px; border-radius:8px; font-size:13px;
  font-family:inherit; outline:none; resize:vertical; transition:border-color .2s;
}
.ts-input:focus { border-color:#ff000066; background:#1a0000; }

.dim-btn {
  display:flex; align-items:center; gap:8px; padding:10px;
  border-radius:8px; border:1px solid #2e2e2e; background:#141414;
  color:#666; cursor:pointer; font-family:inherit; transition:all .15s; text-align:left;
}
.dim-btn.active { border-color:#ff0000; background:#2a0000; color:#ff0000; }
.dim-btn:hover:not(.active) { border-color:#3a3a3a; color:#aaa; }

.chip-btn {
  padding:7px 6px; border-radius:6px; border:1px solid #2e2e2e;
  background:#141414; color:#666; cursor:pointer; font-family:inherit;
  font-size:12px; font-weight:500; transition:all .15s; text-align:center;
}
.chip-btn.active { border-color:#ff0000; background:#2a0000; color:#ff4444; font-weight:700; }
.chip-btn:hover:not(.active) { border-color:#3a3a3a; color:#aaa; }

.tog-btn {
  padding:8px; border-radius:6px; border:1px solid #2e2e2e;
  background:#141414; color:#666; cursor:pointer; font-family:inherit;
  font-size:11px; font-weight:600; transition:all .15s;
}
.tog-btn.active { border-color:#ff0000; background:#2a0000; color:#ff4444; }

.skin-btn {
  width:26px; height:26px; border-radius:50%; cursor:pointer;
  border:2px solid transparent; transition:all .15s; flex-shrink:0;
}
.skin-btn.active { border-color:#ff0000; transform:scale(1.15); box-shadow:0 0 0 2px #1a1a1a; }

.gen-btn {
  width:100%; padding:14px; background:#ff0000; color:#fff;
  border:none; border-radius:10px; font-weight:800; font-size:14px;
  cursor:pointer; font-family:inherit; transition:all .15s; letter-spacing:.5px;
  display:flex; align-items:center; justify-content:center; gap:8px;
}
.gen-btn:hover:not(:disabled) { background:#cc0000; transform:translateY(-1px); box-shadow:0 6px 24px #ff000055; }
.gen-btn:disabled { opacity:.25; cursor:not-allowed; transform:none; }

.copy-btn {
  padding:7px 14px; background:#222; border:1px solid #333;
  color:#aaa; border-radius:8px; cursor:pointer; font-family:inherit;
  font-size:12px; font-weight:600; transition:all .15s; display:flex; align-items:center; gap:6px;
}
.copy-btn:hover { border-color:#ff000066; color:#ff4444; background:#2a0000; }
.copy-btn:disabled { opacity:.3; cursor:not-allowed; }

.red-btn { background:#2a0000 !important; border-color:#ff000055 !important; color:#ff4444 !important; }
.red-btn:hover { background:#3a0000 !important; }

.tab-pill {
  padding:4px 12px; border-radius:20px; border:1px solid #2e2e2e;
  background:transparent; color:#555; cursor:pointer; font-family:inherit; font-size:11px; font-weight:600;
  transition:all .15s;
}
.tab-pill.active { background:#2a0000; border-color:#ff000066; color:#ff0000; }

.place-btn {
  aspect-ratio:1; border-radius:6px; border:1px solid #2e2e2e;
  background:#141414; cursor:pointer; display:flex; align-items:center; justify-content:center;
  transition:all .15s;
}
.place-btn.active { border-color:#ff0000; background:#2a0000; }
.place-btn:hover:not(.active) { border-color:#3a3a3a; }

.orient-btn {
  padding:10px 6px; border-radius:8px; border:1px solid #2e2e2e;
  background:#141414; color:#555; cursor:pointer; font-family:inherit;
  font-size:10px; font-weight:700; transition:all .15s; text-align:center; letter-spacing:.5px;
}
.orient-btn.active { border-color:#ff0000; background:#2a0000; color:#ff4444; }

.layer-card {
  padding:10px; border-radius:8px; border:1px solid #2a2a2a;
  background:#141414; cursor:pointer; transition:border-color .15s;
}
.layer-card.active { border-color:#ff000055; background:#1a0000; }

.layer-input {
  width:100%; background:#1e1e1e; border:1px solid #2e2e2e;
  color:#ccc; padding:6px 8px; border-radius:5px;
  font-size:12px; font-family:inherit; outline:none; transition:border-color .2s;
}
.layer-input:focus { border-color:#ff000066; }

.add-layer-btn {
  margin-left:auto; width:20px; height:20px; border-radius:50%;
  border:1px solid #333; background:#1e1e1e; color:#555;
  cursor:pointer; font-size:14px; display:flex; align-items:center; justify-content:center;
  font-family:inherit; line-height:1; transition:all .15s;
}
.add-layer-btn:hover:not(:disabled) { border-color:#ff0000; color:#ff0000; background:#2a0000; }
.add-layer-btn:disabled { opacity:.2; cursor:not-allowed; }

.provider-card {
  flex:1; padding:16px; border-radius:10px; border:1px solid #2e2e2e;
  background:#141414; color:#666; cursor:pointer; font-family:inherit;
  transition:all .15s; text-align:center;
}
.provider-card.active { border-color:#ff0000; background:#2a0000; color:#eee; }

.spinner {
  display:inline-block; width:13px; height:13px;
  border:2px solid #ff000022; border-top-color:#ff0000;
  border-radius:50%; animation:spin .7s linear infinite;
}
@keyframes spin { to { transform:rotate(360deg); } }

.preview-canvas {
  container-type: inline-size;
  container-name: thumb;
}
`;
