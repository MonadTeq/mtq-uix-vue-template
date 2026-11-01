<script lang="ts" setup>
import { ref } from "vue"
import {
  Accordion,
  Alert,
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  Card,
  Carousel,
  Checkbox,
  Chip,
  Collapse,
  Dropdown,
  Input,
  InputGroup,
  Label,
  ListGroup,
  ListGroupItem,
  Modal,
  Nav,
  NavLink,
  Pagination,
  Placeholder,
  Popover,
  Progress,
  Radio,
  Range,
  Select,
  Spinner,
  Tabs,
  Textarea,
  Toast,
  Tooltip
} from "@/shared/ui"

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Demo" },
  { label: "UI Primitives" }
]

const tabItems = [
  { label: "Buttons", name: "buttons" },
  { label: "Forms", name: "forms" },
  { label: "Feedback", name: "feedback" }
]
const activeTab = ref("buttons")

const dropdownItems = [
  { label: "Profile" },
  { label: "Settings" },
  { label: "Log out", divided: true }
]

const modalOpen = ref(false)
const toastOpen = ref(true)
const chipOpen = ref(true)
const page = ref(1)
const accordionOpen = ref("one")
const collapseOpen = ref(["one"])
const name = ref("")
const bio = ref("")
const agreed = ref(false)
const option = ref("a")
const plan = ref("pro")
const volume = ref(50)
const loading = ref(false)
</script>

<template>
  <div class="app-container">
    <h1>UI Primitives</h1>
    <p class="lead">
      Base, headless, themeable components in <code>src/shared/ui</code>. They wrap
      Element Plus behind a neutral API and are styled exclusively with semantic
      tokens. See <a href="/docs/style-schemes">Style Schemes</a> to see them
      re-theme live.
    </p>

    <Card title="Actions" class="section">
      <div class="row">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button :loading="loading" @click="loading = !loading">Loading</Button>
        <Button disabled>Disabled</Button>
      </div>
      <div class="row">
        <ButtonGroup size="sm">
          <Button variant="secondary">Left</Button>
          <Button variant="secondary">Middle</Button>
          <Button variant="secondary">Right</Button>
        </ButtonGroup>
      </div>
    </Card>

    <Card title="Navigation" class="section">
      <Nav>
        <NavLink href="#" active>Active</NavLink>
        <NavLink href="#">Link</NavLink>
        <NavLink disabled>Disabled</NavLink>
      </Nav>
      <Breadcrumb :items="breadcrumbItems" class="row" />
      <Pagination v-model="page" :total="100" :page-size="10" />
    </Card>

    <Card title="Tabs" class="section">
      <Tabs v-model="activeTab" :items="tabItems">
        <template #buttons>
          <div class="row">
            <Button variant="primary">Primary</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </template>
        <template #forms>
          <Input v-model="name" placeholder="Your name" />
        </template>
        <template #feedback>
          <Alert variant="success" title="All good" />
        </template>
      </Tabs>
    </Card>

    <Card title="Display" class="section">
      <div class="row">
        <Badge variant="primary">Primary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge shape="pill">Pill</Badge>
      </div>
      <div class="row">
        <Spinner size="sm" />
        <Spinner />
        <Spinner variant="grow" size="lg" />
      </div>
      <Progress :value="60" class="row" />
      <Progress :value="30" variant="warning" striped class="row" />
      <div class="row">
        <Placeholder width="100%" height="1rem" />
        <Placeholder width="50%" height="1rem" />
      </div>
    </Card>

    <Card title="Lists &amp; surfaces" class="section">
      <ListGroup>
        <ListGroupItem active>Active item</ListGroupItem>
        <ListGroupItem>Regular item</ListGroupItem>
        <ListGroupItem disabled>Disabled item</ListGroupItem>
      </ListGroup>
      <Accordion v-model="accordionOpen" :items="[{ title: 'One', name: 'one' }, { title: 'Two', name: 'two' }]" class="row">
        <template #one>First panel</template>
        <template #two>Second panel</template>
      </Accordion>
      <Collapse v-model="collapseOpen" :items="[{ title: 'Section', name: 'one' }]" class="row">
        <template #one>Collapsible content</template>
      </Collapse>
    </Card>

    <Card title="Overlays" class="section">
      <div class="row">
        <Dropdown :items="dropdownItems">
          <Button variant="secondary">Dropdown</Button>
        </Dropdown>
        <Tooltip content="A helpful hint">
          <Button variant="ghost">Hover me</Button>
        </Tooltip>
        <Popover title="Info">
          <template #content>Popover content</template>
          <Button variant="ghost">Popover</Button>
        </Popover>
        <Button variant="primary" @click="modalOpen = true">Open modal</Button>
        <Toast :visible="toastOpen" variant="success" @close="toastOpen = false">
          Changes saved.
        </Toast>
      </div>
      <Carousel :items="[{ name: 'a' }, { name: 'b' }]" class="row">
        <template #default="{ item }">
          <div class="carousel-slide">Slide {{ item.name }}</div>
        </template>
      </Carousel>
    </Card>

    <Card title="Chips &amp; alerts" class="section">
      <div class="row">
        <Chip variant="danger" :dismissible="chipOpen" @close="chipOpen = false">Dismiss me</Chip>
        <Chip variant="success">Done</Chip>
      </div>
      <Alert variant="primary" title="Info" class="row" />
      <Alert variant="warning" title="Warning" class="row" />
      <Alert variant="danger" title="Danger" description="Something went wrong." />
    </Card>

    <Card title="Forms" class="section">
      <div class="form">
        <Label for="name">Name</Label>
        <Input id="name" v-model="name" placeholder="Your name" />

        <Label>Bio</Label>
        <Textarea v-model="bio" :rows="3" />

        <Checkbox v-model="agreed" label="I agree" />

        <div class="row">
          <Radio v-model="option" value="a" label="Option A" />
          <Radio v-model="option" value="b" label="Option B" />
        </div>

        <Select v-model="plan" :options="[{ label: 'Pro', value: 'pro' }, { label: 'Free', value: 'free' }]" />

        <Range v-model="volume" :min="0" :max="100" />

        <InputGroup>
          <template #prepend>@</template>
          <Input v-model="name" />
        </InputGroup>
      </div>
    </Card>

    <Modal v-model="modalOpen" title="Example modal" size="sm">
      <p>This is a modal built from the shared <code>Modal</code> primitive.</p>
      <template #footer>
        <Button variant="secondary" @click="modalOpen = false">Cancel</Button>
        <Button variant="primary" @click="modalOpen = false">Confirm</Button>
      </template>
    </Modal>
  </div>
</template>

<style lang="scss" scoped>
.lead {
  color: var(--color-text-regular);
  margin-bottom: var(--space-5);
}

.section {
  margin-bottom: var(--space-5);
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  align-items: center;
  margin-bottom: var(--space-3);
}

.form {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  max-width: 480px;
}

.carousel-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: var(--color-surface-hover);
  color: var(--color-text-regular);
}
</style>
