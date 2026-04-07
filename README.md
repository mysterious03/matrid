# 🌌 MatriGrid

**Infinite 2D spatial expansion. Zero data movement.**

MatriGrid is a high-performance, quad-directional sparse data structure engineered specifically for robotics vision, satellite imagery, and large-scale spatial computing. It allows for logical boundary expansion in $O(1)$ time while maintaining extreme memory efficiency through sparse spatial mapping.

![MatriGrid Header](https://raw.githubusercontent.com/mysterious03/matrid/main/public/logo.png)

---

## 🚀 Core Proposition

Traditional 2D arrays are constrained by fixed boundaries. Expanding them requires $O(N)$ reallocations and data migrations. MatriGrid solves this by treating space as a dynamic, sparse map where boundaries are merely logical pointers.

- **Expansion**: $O(1)$ complexity for adding new rows/columns in any direction.
- **Efficiency**: Sparse storage ensures memory is only used where data exists.
- **Atomic Operations**: Push, Pop, and Peek operations are localized and atomic.
- **Coordinate Mapping**: Advanced spatial transformations like 90° rotations and transpositions are handled through logical coordinate remapping.

---

## 🛠️ Technical Features

### 1. Visual Workbench (Simulator)
The integrated simulator provides a low-level preview of bound-shifting logic. Users can interact with the grid via:
- **Manual Controls**: Explicit "Push" and "Pop" actions for all four cardinal directions.
- **Terminal Console**: A built-in CLI supporting commands like `pushTop()`, `rotate90()`, and `find(val)`.
- **Real-time Feedback**: Visual indicators for new nodes, origin points, and search results.

### 2. Spatial Engine
- **Quad-Directional Expansion**: Grow the grid Up, Down, Left, or Right without affecting existing data.
- **Sparse Traversal**: Efficiently iterate only through occupied nodes using `forEach(fn)`.
- **Atomic Peek/Pop**: Verify or remove edge data with specialized single-cycle operations.

### 3. Modern Tech Stack
- **Frontend**: React 18 with Vite for lightning-fast HMR.
- **Animations**: Framer Motion for smooth, hardware-accelerated spatial transitions.
- **Styling**: Tailwind CSS with a custom "Cyber-Pro" design system.
- **Icons**: Lucide React for consistent, crisp iconography.

---

## 🖥️ Getting Started

To run the MatriGrid workbench locally:

```bash
# Clone the repository
git clone https://github.com/mysterious03/matrid.git

# Navigate to directory
cd matrid

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📐 Architecture

MatriGrid utilizes a coordinate-based sparse mapping strategy. Instead of a contiguous memory block, nodes are indexed by their `(x, y)` coordinates, allowing the "logical center" to shift without moving existing data.

| Operation | Complexity | Description |
| :--- | :--- | :--- |
| **Push** | $O(1)$ | Expand logical boundary |
| **Pop** | $O(1)$ | Contract logical boundary |
| **Peek** | $O(1)$ | Inspect edge data |
| **Rotate** | $O(N)$ | Coordinate remap (N = nodes) |

---

## 👤 Architect
**Suriya Prakash**  
*Lead Spatial Engineer*

---

> [!IMPORTANT]
> MatriGrid is currently in **v1.0.0 Alpha**. It is engineered for low-level spatial logic experimentation and is not yet recommended for production database systems.
