const SHARED_SOURCES = [
  "Dell'Acqua, F., McFowland III, E., Mollick, E., Lifshitz-Assaf, H., Kellogg, K. C., Rajendran, S., Krayer, L., Candelon, F. and Lakhani, K. R. (2023). <em>Navigating the Jagged Technological Frontier: Field Experimental Evidence of the Effects of AI on Knowledge Worker Productivity and Quality</em>. Working Paper 24-013. Harvard Business School.",
  "Forrester Consulting (2025). <em>The Total Economic Impact&#8482; Of Microsoft 365 Copilot: Cost Savings And Business Benefits Enabled By Microsoft 365 Copilot</em>. March 2025. Forrester Research, Inc.",
  "Gartner (2024). <em>Gartner Identifies Four Emerging Challenges to Delivering Value from AI Safely and at Scale</em>. [Press release], 21 October.",
  "Gartner (2025). <em>Gartner Survey Shows Supply Chain GenAI Productivity Gains at Individual Level, While Creating New Complications for Organizations</em>. [Press release], 5 February."
];

export const CONTENT_BY_LOCALE = {
  sv: {
    locale: 'sv-SE',
    fileNamePrefix: 'beslutsunderlag-ai-skuld',
    dateFormat: {
      dateStyle: 'long',
      timeStyle: 'short'
    },
    periodLabels: {
      annual: (value) => `${value} / år`,
      monthly: (value) => `${value} / månad`,
      daily: (value) => `${value} / dag`
    },
    pdfButtons: {
      ready: 'Ladda ner presentationsunderlag för chef och ledning',
      disabled: 'Beräkna kostnaden innan du kan ladda ner PDF',
      loading: 'Genererar PDF...'
    },
    validation: {
      empty: 'Fyll i antal tjänstemän så visar vi vad bristande AI-användning kostar er.',
      invalid: 'Ange ett giltigt antal tjänstemän för att få ett tydligt beslutsunderlag.',
      zero: 'Skriv in minst 1 tjänsteman så ser ni hur snabbt små tidsförluster blir stora kostnader.',
      negative: 'Negativa tal fungerar inte här. Ange faktiskt antal tjänstemän så räknar vi fram ett relevant underlag.'
    },
    basis: {
      legend: 'Välj antagande för beräkningen',
      groupAriaLabel: 'Val av grundantagande',
      trustLine: 'Samma modell, olika nivåer för hur konservativt eller offensivt ni vill räkna i beslutsunderlaget.',
      methodLinkLabel: 'Läs mer om metod och källor',
      selectedBadge: 'Vald nivå',
      resultSummaryPrefix: 'Beräkningen bygger på nivå',
      resultSummarySuffix: 'per tjänsteman och år.'
    },
    result: {
      kicker: 'RESULTAT, BESLUTSUNDERLAG OCH NÄSTA STEG',
      copy: 'Så mycket kostar det er per år, månad och dag att AI ännu inte används systematiskt i vardagliga arbetsmoment<sup class="source-mark"><a href="#" data-url-key="anchors.methodSources" aria-label="Se metod och källor för investeringsunderlaget">[2]</a></sup>.',
      explainerTitle: 'Nästa steg för er',
      explainerItems: [
        '<strong>Ladda ner underlaget.</strong> Använd det som presentationsunderlag för chef, ledning eller kollegor<sup class="source-mark"><a href="#" data-url-key="anchors.methodSources" aria-label="Se metod och källor för resultattolkning">[3]</a></sup>.',
        '<strong>Bedöm hur snabbt ni bör agera.</strong> Ju högre AI-skuld, desto större skäl att börja med fas 1 direkt.',
        '<strong>Boka en kostnadsfri genomgång.</strong> Vi visar hur ni kan förankra, starta och implementera stegvis<sup class="source-mark"><a href="#" data-url-key="anchors.methodSources" aria-label="Se metod och källor för beslutslogiken">[4]</a></sup>.'
      ],
      interpretationItems: [
        {
          title: 'Vad siffran betyder affärsmässigt',
          body: 'Beräkningen synliggör ett bortfall i produktivitet, kapacitet och genomförandekraft som annars lätt förblir osynligt i vardagen.'
        },
        {
          title: 'Varför underlaget är värt att dela',
          body: 'Resultatet är utformat för att kunna skickas vidare internt och ge chef eller ledning ett konkret underlag för att prioritera nästa steg.'
        },
        {
          title: 'Varför möte är nästa naturliga steg',
          body: 'I en kort genomgång visar vi hur ni kan tolka resultatet, välja rätt startpunkt och komma igång utan att göra förändringen större än nödvändigt.'
        }
      ]
    },
    method: {
      sectionCopy: 'Det här är en lättläst tillitsnivå för beslutsfattare: vad forskningen faktiskt visar, vilka nivåer som används i modellen och vad som krävs för att realisera värdet.',
      items: [
        {
          type: 'levels',
          summary: '1. Hur ska de tre nivåerna förstås?',
          intro: 'Nivåerna nedan är samma tre nivåer som används i kalkylatorn och i PDF-underlaget. De ska läsas som tre tydliga beslutsnivåer i samma modell, från försiktig bedömning till högre potential.',
          highlight: {
            title: 'Potential utöver vald nivå',
            paragraphs: [
              'Den markerade nivån visar vilket antagande som används i kalkylatorn och i beslutsunderlaget. Den är avsedd att ge ett tydligt och jämförbart basvärde för beslut.',
              'Forskningen pekar samtidigt på att större värden kan frigöras när AI används mer systematiskt i arbetssätt, styrning, koordinering och implementering. Superintelligents bedömning är därför att företag som går vidare till fas 2 och fas 3 i modellen i många fall kan frigöra ytterligare potential utöver nivåerna ovan.'
            ]
          }
        },
        {
          type: 'bullets',
          summary: '2. Vad påverkar de olika kostnadsnivåerna?',
          bullets: [
            '<strong>Kunskapsintensitet</strong>: ju mer arbetet bygger på analys, syntes och informationshantering, desto större blir potentialen.',
            '<strong>Arbetets innehåll</strong>: analys, skrivande, dokumentation, koordinering och beslutsstöd påverkas ofta mer än rent transaktionella moment.',
            '<strong>Grad av underanvändning</strong>: ju bredare och mer ojämn AI-användningen är mellan roller, desto större blir det förlorade värdet.',
            '<strong>Implementationsmognad</strong>: verktygstillgång räcker inte; faktisk adoption i arbetsflöden avgör utfallet.',
            '<strong>Styrning och skalningsförmåga</strong>: governance, uppföljning och tydliga arbetssätt avgör om värdet realiseras säkert och i större skala.',
            '<strong>Den ojämna teknologiska gränsen</strong>: värdet blir högre när arbetet ligger inom AI:s användbara område och lägre när uppgiften faller utanför den gränsen.',
            '<strong>Kvalitetens ekonomiska betydelse</strong>: där bättre kvalitet och mindre omarbete spelar stor roll blir den högre potentialnivån mer relevant.'
          ]
        },
        {
          type: 'paragraphs',
          summary: '3. Vad visar underlaget sammantaget?',
          paragraphs: [
            'Underlaget visar sammantaget att värdet av AI inte främst uppstår genom tillgång till verktyg, utan genom hur väl AI omsätts i verkliga arbetssätt, prioriteringar och ledning. Forskningen stödjer att effekten ökar när användningen blir mer integrerad, mer strukturerad och mer organisatoriskt förankrad.',
            'Det är också därför nivåerna i modellen ska läsas som beslutsnivåer, inte som ett absolut tak för potential. Den valda nivån ger ett rimligt och användbart investeringsunderlag. Superintelligents bedömning är samtidigt att företag som går vidare från en första aktivering till mer systematisk implementation ofta kan frigöra ytterligare värde i fas 2 och fas 3.',
            'För beslutsfattare innebär det här att frågan inte bara är om AI ska användas, utan hur snabbt verksamheten kan gå från en begränsad användning till ett arbetssätt som stärker lönsamhet, minskar konsultberoende och bygger intern kapacitet över tid.'
          ]
        },
        {
          type: 'sources',
          summary: '4. Exakta källor',
          id: 'method-sources',
          sources: SHARED_SOURCES
        }
      ]
    },
    levels: [
      {
        id: 'cautious',
        value: 75000,
        label: 'Försiktig',
        amountLabel: '75 000 kr',
        heroAmountLabel: '75 000 kr',
        infoTitle: 'Försiktig',
        infoCopy: 'Konservativ uppskattning för organisationer som vill räkna lågt. Bygger på dokumenterade tidsvinster och passar när ni vill börja försiktigt men ändå evidensbaserat.',
        methodRange: '75 000 kr per tjänsteman och år',
        methodReadAs: 'Lägsta nivån i modellen. Fångar främst direkta tidsvinster och lämnar liten marginal för bredare kvalitets- och koordinationseffekter.'
      },
      {
        id: 'core',
        value: 100000,
        label: 'Normal',
        amountLabel: '100 000 kr',
        heroAmountLabel: '100 000 kr',
        infoTitle: 'Normal',
        infoCopy: 'Realistiskt huvudantagande för de flesta kunskapsintensiva verksamheter. Väger in hur komplexitet, arbetsflöden och varierande AI-mognad påverkar den faktiska alternativkostnaden.',
        methodRange: '100 000 kr per tjänsteman och år',
        methodReadAs: 'Huvudnivån i beslutsunderlaget. Passar när ni vill använda modellen som ett balanserat och praktiskt huvudantagande.'
      },
      {
        id: 'expanded',
        value: 125000,
        label: 'Hög potential',
        amountLabel: '125 000 kr',
        heroAmountLabel: '125 000 kr',
        infoTitle: 'Hög potential',
        infoCopy: 'För verksamheter där AI kan ge stor effekt i många återkommande arbetsmoment. Här fångas även bredare effekter som kvalitet, tempo, omarbete och koordineringsförluster.',
        methodRange: '125 000 kr per tjänsteman och år',
        methodReadAs: 'Den offensivaste nivån i modellen. Relevant när utebliven AI-användning även påverkar kvalitet, tempo, koordinering och andra ordningens värdeeffekter.'
      }
    ]
  },
  en: {
    locale: 'en-US',
    fileNamePrefix: 'ai-decision-brief',
    dateFormat: {
      dateStyle: 'long',
      timeStyle: 'short'
    },
    periodLabels: {
      annual: (value) => `${value} / year`,
      monthly: (value) => `${value} / month`,
      daily: (value) => `${value} / day`
    },
    pdfButtons: {
      ready: 'Download presentation brief for manager and leadership',
      disabled: 'Calculate the cost before you can download the PDF',
      loading: 'Generating PDF...'
    },
    validation: {
      empty: 'Enter the number of office employees and we will show what insufficient AI usage is costing you.',
      invalid: 'Enter a valid number of office employees to get a clear decision brief.',
      zero: 'Enter at least 1 office employee and you will see how quickly small time losses become large costs.',
      negative: 'Negative numbers do not work here. Enter the actual number of office employees and we will produce a relevant brief.'
    },
    basis: {
      legend: 'Choose assumption for the calculation',
      groupAriaLabel: 'Choice of baseline assumption',
      trustLine: 'Same model, different levels depending on how conservatively or aggressively you want to calculate in the decision brief.',
      methodLinkLabel: 'Read more about method and sources',
      selectedBadge: 'Selected level',
      resultSummaryPrefix: 'The estimate is based on level',
      resultSummarySuffix: 'per office employee per year.'
    },
    result: {
      kicker: 'RESULTS, DECISION BRIEF, AND NEXT STEPS',
      copy: 'This is what it costs you per year, month, and day that AI is still not used systematically in everyday work tasks<sup class="source-mark"><a href="#" data-url-key="anchors.methodSources" aria-label="See method and sources for the investment brief">[2]</a></sup>.',
      explainerTitle: 'Next steps for you',
      explainerItems: [
        '<strong>Download the brief.</strong> Use it as presentation material for a manager, leadership team, or colleagues<sup class="source-mark"><a href="#" data-url-key="anchors.methodSources" aria-label="See method and sources for result interpretation">[3]</a></sup>.',
        '<strong>Assess how quickly you should act.</strong> The higher the AI debt, the stronger the case for starting with phase 1 immediately.',
        '<strong>Book a free walkthrough.</strong> We show how you can align, start, and implement step by step<sup class="source-mark"><a href="#" data-url-key="anchors.methodSources" aria-label="See method and sources for the decision logic">[4]</a></sup>.'
      ],
      interpretationItems: [
        {
          title: 'What the figure means from a business perspective',
          body: 'The estimate makes visible a loss of productivity, capacity, and execution that otherwise easily remains invisible in day-to-day work.'
        },
        {
          title: 'Why the brief is worth sharing',
          body: 'The result is designed to be forwarded internally and give a manager or leadership team a concrete basis for prioritizing the next step.'
        },
        {
          title: 'Why a meeting is the natural next step',
          body: 'In a short walkthrough, we show how to interpret the result, choose the right starting point, and get moving without making the change larger than necessary.'
        }
      ]
    },
    method: {
      sectionCopy: 'This is a concise trust layer for decision-makers: what the research actually shows, which levels are used in the model, and what is required to realize the value.',
      items: [
        {
          type: 'levels',
          summary: '1. How should the three levels be understood?',
          intro: 'The levels below are the same three levels used in the calculator and in the PDF brief. They should be read as three clear decision levels within the same model, from cautious estimate to higher potential.',
          highlight: {
            title: 'Potential beyond the selected level',
            paragraphs: [
              'The highlighted level shows which assumption is used in the calculator and in the decision brief. It is intended to provide a clear and comparable baseline value for decisions.',
              'At the same time, the research points to larger gains when AI is used more systematically in ways of working, governance, coordination, and implementation. Superintelligent therefore assesses that companies moving on to phase 2 and phase 3 in the model can often unlock additional potential beyond the levels above.'
            ]
          }
        },
        {
          type: 'bullets',
          summary: '2. What affects the different cost levels?',
          bullets: [
            '<strong>Knowledge intensity</strong>: the more the work is based on analysis, synthesis, and information handling, the greater the potential becomes.',
            '<strong>Nature of the work</strong>: analysis, writing, documentation, coordination, and decision support are often affected more than purely transactional tasks.',
            '<strong>Degree of underuse</strong>: the broader and more uneven AI usage is across roles, the greater the lost value becomes.',
            '<strong>Implementation maturity</strong>: tool access alone is not enough; actual adoption in workflows determines the outcome.',
            '<strong>Governance and scaling capability</strong>: governance, follow-up, and clear ways of working determine whether the value is realized safely and at larger scale.',
            '<strong>The jagged technological frontier</strong>: value is higher when the work lies within AI’s usable zone and lower when the task falls outside that frontier.',
            '<strong>The economic importance of quality</strong>: where higher quality and less rework matter materially, the higher potential level becomes more relevant.'
          ]
        },
        {
          type: 'paragraphs',
          summary: '3. What does the brief show overall?',
          paragraphs: [
            'Overall, the brief shows that the value of AI does not primarily arise from access to tools, but from how well AI is translated into real ways of working, priorities, and leadership. The research supports that the impact increases when usage becomes more integrated, more structured, and more organizationally anchored.',
            'That is also why the levels in the model should be read as decision levels, not as an absolute ceiling for potential. The selected level gives a reasonable and usable investment brief. At the same time, Superintelligent assesses that companies moving from an initial activation to more systematic implementation can often unlock additional value in phase 2 and phase 3.',
            'For decision-makers, this means the question is not only whether AI should be used, but how quickly the organization can move from limited usage to a way of working that strengthens profitability, reduces consultant dependence, and builds internal capability over time.'
          ]
        },
        {
          type: 'sources',
          summary: '4. Exact sources',
          id: 'method-sources',
          sources: SHARED_SOURCES
        }
      ]
    },
    levels: [
      {
        id: 'cautious',
        value: 75000,
        label: 'Cautious',
        amountLabel: '75,000 SEK',
        heroAmountLabel: '75,000 SEK',
        infoTitle: 'Cautious',
        infoCopy: 'A conservative estimate for organizations that want to calculate on the low side. Based on documented time savings and suitable when you want to start cautiously while still staying evidence-based.',
        methodRange: '75,000 SEK per office employee per year',
        methodReadAs: 'The lowest level in the model. Primarily captures direct time savings and leaves little room for broader quality and coordination effects.'
      },
      {
        id: 'core',
        value: 100000,
        label: 'Standard',
        amountLabel: '100,000 SEK',
        heroAmountLabel: '100,000 SEK',
        infoTitle: 'Standard',
        infoCopy: 'A realistic main assumption for most knowledge-intensive organizations. Takes into account how complexity, workflows, and varying AI maturity affect the actual opportunity cost.',
        methodRange: '100,000 SEK per office employee per year',
        methodReadAs: 'The main level in the decision brief. Suitable when you want to use the model as a balanced and practical default assumption.'
      },
      {
        id: 'expanded',
        value: 125000,
        label: 'High potential',
        amountLabel: '125,000 SEK',
        heroAmountLabel: '125,000 SEK',
        infoTitle: 'High potential',
        infoCopy: 'For organizations where AI can have a large effect across many recurring work tasks. This also captures broader effects such as quality, speed, rework, and coordination losses.',
        methodRange: '125,000 SEK per office employee per year',
        methodReadAs: 'The most ambitious level in the model. Relevant when insufficient AI usage also affects quality, speed, coordination, and second-order value effects.'
      }
    ]
  }
};

export function getContentForLocale(localeKey) {
  return CONTENT_BY_LOCALE[localeKey];
}

export function getLevelById(content, levelId) {
  return content.levels.find((level) => level.id === levelId) || content.levels[0];
}
