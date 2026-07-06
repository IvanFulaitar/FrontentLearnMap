import { ExternalLink } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { resources } from "../data/resources";
import { resourceCategoryLabels } from "../constants/labels";
import { PageHeader } from "../shared/page/PageHeader";
import styles from "./PlatformPages.module.css";

export function ResourcesPage() {
  return (
    <div className="page">
      <PageHeader
        breadcrumbs={[{ label: "Дашборд", href: "/" }, { label: "Ресурси" }]}
        eyebrow="Ресурси"
        title="Навчальні ресурси"
        description="Офіційна документація, відео, статті, YouTube, GitHub, шпаргалки та сайти для практики."
      />
      <section className={styles.grid}>
        {resources.map((resource) => (
          <Card className={styles.card} key={resource.id}>
            <Badge>{resourceCategoryLabels[resource.category]}</Badge>
            <h2>{resource.title}</h2>
            <p>{resource.description}</p>
            <a href={resource.url} target="_blank" rel="noreferrer"><ExternalLink size={16} /> Відкрити ресурс</a>
          </Card>
        ))}
      </section>
    </div>
  );
}
