import type { Lesson } from "../../types/course";
import { MarkdownRenderer } from "../../shared/markdown/MarkdownRenderer";
import { Card } from "../ui/Card";
import { Callout } from "./Callout";
import { LessonPractice } from "./LessonPractice";
import styles from "./LessonContent.module.css";

interface LessonContentProps {
  lesson: Lesson;
}

/**
 * Cheat-sheet layout used only for lessons with hand-written `whatIsIt`
 * content (currently: the hand-authored HTML modules). No "Теорія" section,
 * no separate "best practices" / "real-world usage" cards — everything a
 * junior dev would actually re-read 5 minutes before an interview, and
 * nothing else. Every other course keeps rendering the pipeline below
 * (`LegacyLessonContent`) exactly as before.
 */
function CheatSheetLessonContent({ lesson }: LessonContentProps) {
  const sections = [
    ["what", "🎯 Що це?"],
    ["why", "🤔 Навіщо це потрібно"],
    ["how", "💻 Як використовувати"],
    ["not", "❌ Чого НЕ робити"],
    ["practice", "🛠 Практика"],
    ["senior", "✅ Як роблять у реальних проєктах"],
    ["remember", "🧠 Запам'ятай"],
    ["interview", "🎤 Питання на співбесіді"],
    ["summary", "📚 Коротко"],
  ] as const;

  const seniorTips = [...(lesson.bestPractices ?? []), ...(lesson.realWorldUsage ?? [])];
  const rememberTop5 = (lesson.remember ?? []).slice(0, 5);

  return (
    <div className={styles.content}>
      <div className={styles.docs}>
        <Card className={styles.section} id="what">
          <h2>🎯 Що це?</h2>
          <p>{lesson.whatIsIt}</p>
        </Card>

        {lesson.whyUseIt ? (
          <Card className={styles.section} id="why">
            <h2>🤔 Навіщо це потрібно</h2>
            <p>{lesson.whyUseIt}</p>
          </Card>
        ) : null}

        <Card className={styles.section} id="how">
          <h2>💻 Як використовувати</h2>
          {lesson.whenToUse?.length ? (
            <ul className={styles.checkList}>
              {lesson.whenToUse.map((item) => <li key={item}>{item}</li>)}
            </ul>
          ) : null}
          {lesson.comparisonTable ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  {lesson.comparisonTable.headers.map((header) => <th key={header}>{header}</th>)}
                </tr>
              </thead>
              <tbody>
                {lesson.comparisonTable.rows.map((row) => (
                  <tr key={row.join("|")}>
                    {row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
          {lesson.codeWalkthroughs?.length ? (
            lesson.codeWalkthroughs.map((walkthrough, index) => (
              <div className={styles.walkthrough} key={index}>
                {walkthrough.before ? <p>{walkthrough.before}</p> : null}
                <pre className={styles.code}>
                  <code>{walkthrough.code}</code>
                </pre>
                {walkthrough.lineNotes?.length ? (
                  <ul className={styles.list}>
                    {walkthrough.lineNotes.map((note) => <li key={note}>{note}</li>)}
                  </ul>
                ) : null}
                {walkthrough.after ? <p>{walkthrough.after}</p> : null}
              </div>
            ))
          ) : null}
        </Card>

        {lesson.whenNotToUse?.length || lesson.dontDoThis || lesson.commonMistakes?.length ? (
          <Card className={styles.section} id="not">
            <h2>❌ Чого НЕ робити</h2>
            {lesson.dontDoThis ? (
              <Callout kind="warning" title="Поганий приклад">
                <pre className={styles.code}>
                  <code>{lesson.dontDoThis.code}</code>
                </pre>
                <p>{lesson.dontDoThis.explanation}</p>
              </Callout>
            ) : null}
            {lesson.whenNotToUse?.length ? (
              <ul className={styles.badList}>
                {lesson.whenNotToUse.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : null}
            {lesson.commonMistakes?.length ? (
              <ul className={styles.badList}>
                {lesson.commonMistakes.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : null}
          </Card>
        ) : null}

        <Card className={styles.section} id="practice">
          <h2>🛠 Практика</h2>
          <LessonPractice practiceTask={lesson.practiceTask} microExercises={lesson.microExercises} />
        </Card>

        {seniorTips.length || lesson.proTip ? (
          <Card className={styles.section} id="senior">
            <h2>✅ Як роблять у реальних проєктах</h2>
            {seniorTips.length ? (
              <ul className={styles.checkList}>
                {seniorTips.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : null}
            {lesson.proTip ? <Callout kind="tip" title="💡 Порада">{lesson.proTip}</Callout> : null}
          </Card>
        ) : null}

        {rememberTop5.length ? (
          <Callout kind="remember" title="🧠 Запам'ятай">
            <ul className={styles.list}>
              {rememberTop5.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </Callout>
        ) : null}

        {lesson.interviewQuestions?.length ? (
          <Card className={styles.section} id="interview">
            <h2>🎤 Питання на співбесіді</h2>
            {lesson.interviewQuestions.map((item) => (
              <details className={styles.interviewItem} key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </Card>
        ) : null}

        <Card className={styles.section} id="summary">
          <h2>📚 Коротко</h2>
          <p>{lesson.summary}</p>
          {lesson.nextLessonNote ? <p>{lesson.nextLessonNote}</p> : null}
        </Card>
      </div>
      <Card className={styles.toc}>
        <strong>Зміст уроку</strong>
        {sections
          .filter(([id]) => {
            if (id === "why") return Boolean(lesson.whyUseIt);
            if (id === "not") return Boolean(lesson.whenNotToUse?.length || lesson.dontDoThis || lesson.commonMistakes?.length);
            if (id === "senior") return Boolean(seniorTips.length || lesson.proTip);
            if (id === "interview") return Boolean(lesson.interviewQuestions?.length);
            return true;
          })
          .map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}
      </Card>
    </div>
  );
}

function LegacyLessonContent({ lesson }: LessonContentProps) {
  const sections = [
    ["what", "Що це?"],
    ["why", "Навіщо це потрібно"],
    ["know", "Чого ти навчишся"],
    ["when", "Коли використовувати"],
    ["when-not", "Коли НЕ використовувати"],
    ["theory", "Теорія"],
    ["examples", "Приклади"],
    ["practice", "Практика"],
    ["mistakes", "Типові помилки"],
    ["dont", "Не роби так"],
    ["best-practices", "Best practices"],
    ["real-world", "У реальних проєктах"],
    ["interview", "На співбесіді"],
    ["summary", "Коротко"],
    ["pro-tip", "Pro tip"],
    ["next", "Що вивчити далі"],
  ] as const;

  return (
    <div className={styles.content}>
      <div className={styles.docs}>
        <Card className={styles.section} id="what">
          <h2>Що це?</h2>
          {lesson.whatIsIt ? <p>{lesson.whatIsIt}</p> : <MarkdownRenderer content={`## ${lesson.title}\n\n${lesson.description}`} />}
        </Card>

        {lesson.whyUseIt || lesson.motivation ? (
          <Card className={styles.section} id="why">
            <h2>Навіщо це потрібно</h2>
            <Callout kind="motivation">{lesson.whyUseIt ?? lesson.motivation}</Callout>
          </Card>
        ) : null}

        <Card className={styles.section} id="know">
          <h2>Чого ти навчишся</h2>
          <ul className={styles.checkList}>
            {lesson.learningObjectives.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </Card>

        {lesson.whenToUse?.length ? (
          <Card className={styles.section} id="when">
            <h2>Коли використовувати</h2>
            <ul className={styles.checkList}>
              {lesson.whenToUse.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </Card>
        ) : null}

        {lesson.whenNotToUse?.length ? (
          <Card className={styles.section} id="when-not">
            <h2>Коли НЕ використовувати</h2>
            <ul className={styles.list}>
              {lesson.whenNotToUse.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </Card>
        ) : null}

        <Card className={styles.section} id="theory">
          <h2>Теорія</h2>
          {lesson.theorySteps?.length ? (
            <div className={styles.steps}>
              {lesson.theorySteps.map((step) => (
                <div className={styles.step} key={step.heading}>
                  <h3>{step.heading}</h3>
                  <p>{step.body}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>{lesson.theory}</p>
          )}
          {lesson.analogy ? <Callout kind="analogy">{lesson.analogy}</Callout> : null}
        </Card>

        <Card className={styles.section} id="examples">
          <h2>Приклади</h2>
          {lesson.codeWalkthroughs?.length ? (
            lesson.codeWalkthroughs.map((walkthrough, index) => (
              <div className={styles.walkthrough} key={index}>
                <p>{walkthrough.before}</p>
                <pre className={styles.code}>
                  <code>{walkthrough.code}</code>
                </pre>
                {walkthrough.lineNotes?.length ? (
                  <ul className={styles.list}>
                    {walkthrough.lineNotes.map((note) => <li key={note}>{note}</li>)}
                  </ul>
                ) : null}
                <p>{walkthrough.after}</p>
              </div>
            ))
          ) : (
            <pre className={styles.code}>
              <code>{lesson.codeExample}</code>
            </pre>
          )}
          {/* Rendered regardless of whether a narrated walkthrough exists
              above, so the "try it yourself" variations aren't hidden now
              that every lesson has a codeWalkthrough. */}
          {lesson.examples?.length ? (
            <>
              <h3>Спробуй сам</h3>
              <ul className={styles.list}>{lesson.examples.map((item) => <li key={item}>{item}</li>)}</ul>
            </>
          ) : null}
        </Card>

        <Card className={styles.section} id="practice">
          <h2>Практика</h2>
          <LessonPractice practiceTask={lesson.practiceTask} microExercises={lesson.microExercises} />
        </Card>

        <Card className={styles.section} id="mistakes">
          <h2>Типові помилки</h2>
          <ul className={styles.list}>{lesson.commonMistakes.map((item) => <li key={item}>{item}</li>)}</ul>
        </Card>

        {lesson.dontDoThis ? (
          <Card className={styles.section} id="dont">
            <h2>Не роби так</h2>
            <Callout kind="warning" title="Поганий приклад">
              <pre className={styles.code}>
                <code>{lesson.dontDoThis.code}</code>
              </pre>
              <p>{lesson.dontDoThis.explanation}</p>
            </Callout>
          </Card>
        ) : null}

        {lesson.bestPractices?.length ? (
          <Card className={styles.section} id="best-practices">
            <h2>Best practices</h2>
            <Callout kind="bestPractice" title="Як роблять досвідчені розробники">
              <ul className={styles.list}>
                {lesson.bestPractices.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </Callout>
          </Card>
        ) : null}

        {lesson.realWorldUsage?.length ? (
          <Card className={styles.section} id="real-world">
            <h2>У реальних проєктах</h2>
            <ul className={styles.list}>{lesson.realWorldUsage.map((item) => <li key={item}>{item}</li>)}</ul>
          </Card>
        ) : null}

        {lesson.interviewQuestions?.length ? (
          <Card className={styles.section} id="interview">
            <h2>На співбесіді</h2>
            {lesson.interviewQuestions.map((item) => (
              <details className={styles.interviewItem} key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </Card>
        ) : null}

        {lesson.remember?.length ? (
          <Callout kind="remember" title="Запамʼятай">
            <ul className={styles.list}>
              {lesson.remember.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </Callout>
        ) : null}

        <Card className={styles.section} id="summary">
          <h2>Коротко</h2>
          <p>{lesson.summary}</p>
        </Card>

        {lesson.proTip ? (
          <Card className={styles.section} id="pro-tip">
            <h2>Pro tip</h2>
            <Callout kind="tip" title="💡 Порада з реальних проєктів">{lesson.proTip}</Callout>
          </Card>
        ) : null}

        <Card className={styles.section} id="next">
          <h2>Що вивчити далі</h2>
          {lesson.nextLessonNote ? <p>{lesson.nextLessonNote}</p> : null}
          <ul className={styles.list}>{lesson.nextSteps.map((item) => <li key={item}>{item}</li>)}</ul>
        </Card>
      </div>
      <Card className={styles.toc}>
        <strong>Зміст уроку</strong>
        {sections
          .filter(([id]) => {
            if (id === "why") return Boolean(lesson.whyUseIt || lesson.motivation);
            if (id === "when") return Boolean(lesson.whenToUse?.length);
            if (id === "when-not") return Boolean(lesson.whenNotToUse?.length);
            if (id === "dont") return Boolean(lesson.dontDoThis);
            if (id === "best-practices") return Boolean(lesson.bestPractices?.length);
            if (id === "real-world") return Boolean(lesson.realWorldUsage?.length);
            if (id === "interview") return Boolean(lesson.interviewQuestions?.length);
            if (id === "pro-tip") return Boolean(lesson.proTip);
            return true;
          })
          .map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}
      </Card>
    </div>
  );
}

export function LessonContent({ lesson }: LessonContentProps) {
  // Hand-written cheat-sheet lessons always set `whatIsIt`; every other
  // lesson (all generated courses, plus any HTML lesson without an override)
  // keeps rendering the original pipeline untouched.
  return lesson.whatIsIt ? <CheatSheetLessonContent lesson={lesson} /> : <LegacyLessonContent lesson={lesson} />;
}
