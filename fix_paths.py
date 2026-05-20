import os

project_dir = "/Users/qweqwe/Desktop/project"

# HTML文件中的相对路径替换规则
html_replacements = [
    ('src="flag-transition.js"', 'src="/flag-transition.js"'),
    ('src="picture/', 'src="/picture/'),
]

# JS文件中的相对路径替换规则
js_replacements = [
    ("'./picture/", "'/picture/"),
]

# 处理 index.html
html_file = os.path.join(project_dir, "index.html")
with open(html_file, "r", encoding="utf-8") as f:
    content = f.read()

for old, new in html_replacements:
    content = content.replace(old, new)

with open(html_file, "w", encoding="utf-8") as f:
    f.write(content)

print("index.html 已更新")

# 处理 flag-transition.js
js_file = os.path.join(project_dir, "flag-transition.js")
with open(js_file, "r", encoding="utf-8") as f:
    content = f.read()

for old, new in js_replacements:
    content = content.replace(old, new)

with open(js_file, "w", encoding="utf-8") as f:
    f.write(content)

print("flag-transition.js 已更新")

# 验证
print("\n--- 验证 index.html 中的 picture/ 引用 ---")
with open(html_file, "r") as f:
    for i, line in enumerate(f, 1):
        if "/picture/" in line or "/flag-transition.js" in line:
            print(f"  第{i}行: {line.strip()}")

print("\n--- 验证 flag-transition.js 中的 picture/ 引用 ---")
with open(js_file, "r") as f:
    for i, line in enumerate(f, 1):
        if "/picture/" in line:
            print(f"  第{i}行: {line.strip()}")
