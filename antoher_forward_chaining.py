# Define the rules
rules = {
    'Rule 1': {
        'if': ['A', 'B'],
        'then': 'C'
    },
    'Rule 2': {
        'if': ['C', 'D'],
        'then': 'E'
    },
    'Rule 3': {
        'if': ['E'],
        'then': 'F'
    }
}

# Define the known facts
facts = ['A', 'B', 'D']

# Initialize the inferred facts
inferred_facts = ['E']

# Apply the rules to infer new facts
while True:
    new_inferred_facts = False
    for rule_name, rule in rules.items():
        if all(condition in inferred_facts for condition in rule['if']) and rule['then'] not in inferred_facts:
            inferred_facts.append(rule['then'])
            new_inferred_facts = True
    if not new_inferred_facts:
        break

# Print the inferred facts
print("Inferred facts:")
print(inferred_facts)
